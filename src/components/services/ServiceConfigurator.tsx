import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, MapPin, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogData } from '../../hooks/useCatalogData';
import { chatProvider } from '../../modules/chat/chatIntegration';
import { leadService } from '../../modules/catalog/catalogService';
import type { Area, PropertyType, ServiceOfferingView, ServiceSelectionContext, TrustPackage } from '../../modules/catalog/types';
import { generateLeadMessage } from '../../modules/lead/messageEngine';
import { whatsappService } from '../../modules/whatsapp/whatsappService';
import { scrollToSection } from '../../lib/sectionNavigation';
import { Button } from '../ui/Button';
import { OptionSelector, type ConfiguratorOption } from './OptionSelector';
import { ServiceResultCard } from './ServiceResultCard';
import { ServiceStepCard } from './ServiceStepCard';
import { WorkTypeComparisonCards } from './WorkTypeComparisonCards';

type ConfiguratorStep = 'service' | 'property' | 'work' | 'result';

function getProgress(step: ConfiguratorStep, selectedService?: ServiceOfferingView) {
  if (step === 'service') return 25;
  if (step === 'property') return 50;
  if (step === 'work') return selectedService?.type === 'property' ? 75 : 66;
  return 100;
}

function getStepLabel(step: ConfiguratorStep) {
  if (step === 'service') return 'Choose service';
  if (step === 'property') return 'Select property type';
  if (step === 'work') return 'Select work package';
  return 'Lead handoff';
}

export function ServiceConfigurator() {
  const navigate = useNavigate();
  const { services, cities, areas, contactDetails, isLoading } = useCatalogData();
  const [step, setStep] = useState<ConfiguratorStep>('service');
  const [selectedService, setSelectedService] = useState<ServiceOfferingView | undefined>();
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | undefined>();
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>();
  const [selectedAreaId, setSelectedAreaId] = useState<string>('area-baner');

  const selectedCity = cities.find((city) => city.isActive) ?? cities[0];
  const activeAreas = areas.filter((area) => area.cityId === selectedCity?.id && area.isActive);
  const selectedArea = activeAreas.find((area) => area.id === selectedAreaId) ?? activeAreas[0];

  const propertySelectorOptions = useMemo<ConfiguratorOption[]>(
    () =>
      (selectedService?.propertyTypes ?? []).map((option) => ({
        id: option,
        label: option,
        meta: 'Property',
        description: option === 'Residential Building' ? 'Societies, towers, gated communities, and residential facilities.' : 'Offices, retail buildings, campuses, and commercial facilities.',
      })),
    [selectedService],
  );

  const availablePackages = useMemo(() => {
    if (!selectedService) return [];
    return selectedService.packages.filter((item) => {
      if (selectedService.type === 'direct') return item.propertyType === undefined;
      return item.propertyType === selectedProperty;
    });
  }, [selectedProperty, selectedService]);

  const selectedPackage = availablePackages.find((item) => item.id === selectedPackageId);
  const resultSelection = selectedService && selectedPackage && selectedCity && selectedArea
    ? {
        service: selectedService,
        package: selectedPackage,
        city: selectedCity,
        area: selectedArea,
        propertyType: selectedPackage.propertyType,
      }
    : undefined;

  const resetFlow = () => {
    setStep('service');
    setSelectedService(undefined);
    setSelectedProperty(undefined);
    setSelectedPackageId(undefined);
  };

  const selectService = (service: ServiceOfferingView) => {
    setSelectedService(service);
    setSelectedProperty(undefined);
    setSelectedPackageId(undefined);
    setStep(service.type === 'property' ? 'property' : 'work');
  };

  const selectProperty = (optionId: string) => {
    setSelectedProperty(optionId as PropertyType);
    setSelectedPackageId(undefined);
    setStep('work');
  };

  const selectPackage = (packageId: string) => {
    setSelectedPackageId(packageId);
    setStep('result');
  };

  const goBack = () => {
    if (step === 'result') {
      setStep('work');
      return;
    }

    if (step === 'work' && selectedService?.type === 'property') {
      setStep('property');
      return;
    }

    if (step === 'work' || step === 'property') {
      setStep('service');
    }
  };

  const buildContext = (selectedPackageForAction: TrustPackage): ServiceSelectionContext | undefined => {
    if (!selectedService || !selectedCity || !selectedArea) return undefined;

    return {
      service: selectedService,
      package: selectedPackageForAction,
      city: selectedCity,
      area: selectedArea,
      propertyType: selectedPackageForAction.propertyType,
    };
  };

  const openWhatsApp = (selection: ServiceSelectionContext) => {
    whatsappService.openMessage(selection, contactDetails?.phones[0] ? `91${contactDetails.phones[0]}` : undefined);
  };

  const openTalkToExpert = (selection?: ServiceSelectionContext) => {
    if (selection) {
      chatProvider.openWithContext(selection);
    }
    navigate('/talk-to-us');
  };

  const openQuoteForm = (selection: ServiceSelectionContext) => {
    const autoMessage = generateLeadMessage(selection);
    window.sessionStorage.setItem('presenti.lead.autoMessage', autoMessage);
    window.dispatchEvent(new CustomEvent('presenti:lead-message', { detail: autoMessage }));
    scrollToSection('contact');
  };

  const submitLead = async (selection: ServiceSelectionContext, lead: { fullName: string; phone: string; email: string }) => {
    await leadService.createLead({
      ...lead,
      serviceId: selection.service.id,
      serviceName: selection.service.name,
      propertyType: selection.package.propertyType,
      workType: selection.package.workType,
      hours: selection.package.hours,
      city: selection.city.name,
      area: selection.area.name,
      autoMessage: generateLeadMessage(selection),
    });
  };

  const progress = getProgress(step, selectedService);

  return (
    <div className="overflow-hidden rounded-[30px] border border-neutral-200 bg-white shadow-[0_32px_100px_rgba(10,42,34,0.08)]">
      <div className="border-b border-neutral-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(237,250,249,0.74))] p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Production service catalog</div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">Build your staffing package</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">
              Choose the service, Pune area, property context, and work package. Lead, chat, and WhatsApp messages are generated automatically.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {step !== 'service' && (
              <Button type="button" variant="outline" size="md" onClick={goBack}>
                <ArrowLeft size={16} />
                Back
              </Button>
            )}
            <Button type="button" variant="ghost" size="md" onClick={resetFlow}>
              <RotateCcw size={16} />
              Reset flow
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            <span>{getStepLabel(step)}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#123F35,#20B2AA)]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {step === 'service' && (
            <motion.div
              key="service-step"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32 }}
            >
              <div className="mb-6 max-w-2xl">
                <h4 className="text-lg font-semibold text-neutral-950">Select a service</h4>
                <p className="mt-2 text-sm leading-6 text-neutral-500">Phase 1 services are mock-repository backed and ready for admin/database integration.</p>
              </div>
              {isLoading ? (
                <div className="rounded-[22px] border border-neutral-200 bg-canvas p-6 text-sm font-semibold text-neutral-500">Loading service catalog...</div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {services.map((service) => (
                    <ServiceStepCard
                      key={service.id}
                      service={service}
                      isSelected={selectedService?.id === service.id}
                      onSelect={selectService}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {step === 'property' && selectedService && (
            <motion.div
              key="property-step"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32 }}
              className="mx-auto max-w-3xl"
            >
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">{selectedService.name}</div>
                <h4 className="mt-2 text-2xl font-semibold text-neutral-950">Select property type</h4>
                <p className="mt-2 text-sm leading-6 text-neutral-500">House Keeping and Facility Manager packages are scoped for residential or commercial sites.</p>
              </div>
              <OptionSelector options={propertySelectorOptions} selectedId={selectedProperty} onSelect={selectProperty} />
            </motion.div>
          )}

          {step === 'work' && selectedService && selectedCity && (
            <motion.div
              key="work-step"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32 }}
            >
              <div className="mb-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">{selectedService.name}</div>
                  <h4 className="mt-2 text-2xl font-semibold text-neutral-950">Choose work package</h4>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">Compare what is included, what stays outside the package, and choose the coverage that fits your site.</p>
                </div>

                <label className="block text-sm font-semibold text-neutral-700">
                  <span className="mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-primary-700" />
                    Service area in {selectedCity.name}
                  </span>
                  <select
                    value={selectedArea?.id ?? ''}
                    onChange={(event) => setSelectedAreaId(event.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
                  >
                    {activeAreas.map((area: Area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <WorkTypeComparisonCards
                packages={availablePackages}
                selectedId={selectedPackageId}
                onSelect={selectPackage}
                onTalkToExpert={() => {
                  const context = availablePackages[0] ? buildContext(availablePackages[0]) : undefined;
                  openTalkToExpert(context);
                }}
                onWhatsApp={(selectedPackageForAction) => {
                  const context = buildContext(selectedPackageForAction);
                  if (context) openWhatsApp(context);
                }}
              />
            </motion.div>
          )}

          {step === 'result' && resultSelection && (
            <motion.div
              key="result-step"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32 }}
            >
              <ServiceResultCard
                selection={resultSelection}
                autoMessage={generateLeadMessage(resultSelection)}
                onGetQuote={() => openQuoteForm(resultSelection)}
                onTalkToExpert={() => openTalkToExpert(resultSelection)}
                onWhatsApp={openWhatsApp}
                onSubmitLead={(lead) => submitLead(resultSelection, lead)}
                onReset={resetFlow}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
