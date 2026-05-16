import { useCallback, useEffect, useMemo, useState } from 'react';
import { Edit3, Plus, Search, Trash2 } from 'lucide-react';
import { useAppSelector } from '../../app/hooks';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { apiGet, apiSend, type PricingPlan, type ServiceCategory } from '../../lib/api';

const emptyPlan = {
  categoryId: '',
  name: '',
  monthlyPrice: 0,
  shiftTiming: '',
  workingHours: '',
  overtimeCharges: 0,
  replacementGuarantee: '',
  availabilitySla: '',
  trialPeriod: '',
  trainingIncluded: true,
  emergencyReplacement: true,
  transportIncluded: false,
  customNotes: '',
  displayOrder: 0,
  featuresText: '',
};

export function AdminPricingPage() {
  const token = useAppSelector((state) => state.auth.accessToken);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [search, setSearch] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [planForm, setPlanForm] = useState(emptyPlan);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!token) return;
    const [categoryResponse, planResponse] = await Promise.all([
      apiGet<ServiceCategory[]>('/pricing/admin/categories?limit=100', token),
      apiGet<PricingPlan[]>('/pricing/admin/plans?limit=100', token),
    ]);
    setCategories(categoryResponse.data);
    setPlans(planResponse.data);
    if (categoryResponse.data[0]) {
      setPlanForm((current) => (current.categoryId ? current : { ...current, categoryId: categoryResponse.data[0].id }));
    }
  }, [token]);

  useEffect(() => {
    loadData().catch(() => setStatus('Could not load pricing data. Sign in with a valid admin API account.'));
  }, [loadData]);

  const filteredPlans = useMemo(() => {
    const needle = search.toLowerCase();
    return plans.filter((plan) =>
      [plan.name, plan.category?.name, plan.shiftTiming, plan.customNotes]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(needle)),
    );
  }, [plans, search]);

  const createCategory = async () => {
    if (!token || !categoryName.trim()) return;
    await apiSend('/pricing/categories', 'POST', { name: categoryName.trim(), isActive: true }, token);
    setCategoryName('');
    setStatus('Category created.');
    await loadData();
  };

  const submitPlan = async () => {
    if (!token || !planForm.categoryId || !planForm.name.trim()) return;
    const payload = {
      categoryId: planForm.categoryId,
      name: planForm.name.trim(),
      monthlyPrice: Number(planForm.monthlyPrice),
      shiftTiming: planForm.shiftTiming,
      workingHours: planForm.workingHours,
      overtimeCharges: Number(planForm.overtimeCharges || 0),
      replacementGuarantee: planForm.replacementGuarantee,
      availabilitySla: planForm.availabilitySla,
      trialPeriod: planForm.trialPeriod,
      trainingIncluded: planForm.trainingIncluded,
      emergencyReplacement: planForm.emergencyReplacement,
      transportIncluded: planForm.transportIncluded,
      customNotes: planForm.customNotes,
      displayOrder: Number(planForm.displayOrder || 0),
      features: editingPlanId
        ? undefined
        : planForm.featuresText
            .split('\n')
            .map((label, index) => ({ label: label.trim(), displayOrder: index + 1 }))
            .filter((feature) => feature.label),
    };

    if (editingPlanId) {
      await apiSend(`/pricing/plans/${editingPlanId}`, 'PATCH', payload, token);
      setStatus('Pricing plan updated.');
    } else {
      await apiSend('/pricing/plans', 'POST', payload, token);
      setStatus('Pricing plan created.');
    }

    setEditingPlanId(null);
    setPlanForm({ ...emptyPlan, categoryId: categories[0]?.id ?? '' });
    await loadData();
  };

  const editPlan = (plan: PricingPlan) => {
    setEditingPlanId(plan.id);
    setPlanForm({
      categoryId: plan.categoryId,
      name: plan.name,
      monthlyPrice: plan.monthlyPrice,
      shiftTiming: plan.shiftTiming ?? '',
      workingHours: plan.workingHours ?? '',
      overtimeCharges: plan.overtimeCharges ?? 0,
      replacementGuarantee: plan.replacementGuarantee ?? '',
      availabilitySla: plan.availabilitySla ?? '',
      trialPeriod: plan.trialPeriod ?? '',
      trainingIncluded: plan.trainingIncluded,
      emergencyReplacement: plan.emergencyReplacement,
      transportIncluded: plan.transportIncluded,
      customNotes: plan.customNotes ?? '',
      displayOrder: plan.displayOrder,
      featuresText: plan.features.map((feature) => feature.label).join('\n'),
    });
  };

  const deletePlan = async (id: string) => {
    if (!token) return;
    await apiSend(`/pricing/plans/${id}`, 'DELETE', undefined, token);
    setStatus('Pricing plan deleted.');
    await loadData();
  };

  const togglePlan = async (plan: PricingPlan) => {
    if (!token) return;
    await apiSend(`/pricing/plans/${plan.id}`, 'PATCH', { isActive: !plan.isActive }, token);
    await loadData();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Pricing Management</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage service categories, package prices, features, SLA notes, and active status.</p>
        </div>
        {status && <Badge variant="info">{status}</Badge>}
      </div>

      {!token && (
        <Card className="mb-6">
          <CardBody>
            <p className="text-sm text-neutral-600">Sign in with the seeded backend admin account to enable CRUD: admin@presenti.in / Admin@12345.</p>
          </CardBody>
        </Card>
      )}

      <div className="grid xl:grid-cols-[380px_1fr] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader><h2 className="text-base font-semibold">Create Category</h2></CardHeader>
            <CardBody className="space-y-3">
              <input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="Service category name" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600" />
              <Button onClick={createCategory} disabled={!token} className="w-full"><Plus size={14} /> Add Category</Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h2 className="text-base font-semibold">{editingPlanId ? 'Edit Plan' : 'Create Plan'}</h2></CardHeader>
            <CardBody className="space-y-3">
              <select value={planForm.categoryId} onChange={(event) => setPlanForm({ ...planForm, categoryId: event.target.value })} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg bg-white">
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              <input value={planForm.name} onChange={(event) => setPlanForm({ ...planForm, name: event.target.value })} placeholder="Package name" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600" />
              <input type="number" value={planForm.monthlyPrice} onChange={(event) => setPlanForm({ ...planForm, monthlyPrice: Number(event.target.value) })} placeholder="Monthly price" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600" />
              <div className="grid grid-cols-2 gap-3">
                <input value={planForm.shiftTiming} onChange={(event) => setPlanForm({ ...planForm, shiftTiming: event.target.value })} placeholder="Shift timing" className="px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600" />
                <input value={planForm.workingHours} onChange={(event) => setPlanForm({ ...planForm, workingHours: event.target.value })} placeholder="Working hours" className="px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600" />
              </div>
              <input value={planForm.replacementGuarantee} onChange={(event) => setPlanForm({ ...planForm, replacementGuarantee: event.target.value })} placeholder="Replacement guarantee" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600" />
              <input value={planForm.availabilitySla} onChange={(event) => setPlanForm({ ...planForm, availabilitySla: event.target.value })} placeholder="Availability SLA" className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600" />
              <textarea value={planForm.featuresText} onChange={(event) => setPlanForm({ ...planForm, featuresText: event.target.value })} placeholder="One feature per line" rows={4} className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600 disabled:bg-neutral-50" disabled={Boolean(editingPlanId)} />
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['trainingIncluded', 'emergencyReplacement', 'transportIncluded'] as const).map((key) => (
                  <label key={key} className="flex items-center gap-2">
                    <input type="checkbox" checked={planForm[key]} onChange={(event) => setPlanForm({ ...planForm, [key]: event.target.checked })} />
                    {key.replace(/([A-Z])/g, ' $1')}
                  </label>
                ))}
              </div>
              <Button onClick={submitPlan} disabled={!token} className="w-full">{editingPlanId ? <Edit3 size={14} /> : <Plus size={14} />} {editingPlanId ? 'Update Plan' : 'Create Plan'}</Button>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader className="gap-4 flex-wrap">
            <h2 className="text-base font-semibold">Pricing Plans</h2>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search plans" className="pl-9 pr-3 py-2 text-sm border border-neutral-200 rounded-lg outline-none focus:border-primary-600" />
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Plan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.map((plan) => (
                  <tr key={plan.id} className="border-b border-neutral-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-neutral-900">{plan.name}</div>
                      <div className="text-xs text-neutral-500">{plan.shiftTiming || 'Timing not set'}</div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{plan.category?.name}</td>
                    <td className="px-4 py-3 font-semibold">₹{plan.monthlyPrice.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => togglePlan(plan)} className="cursor-pointer bg-transparent border-none p-0">
                        <Badge variant={plan.isActive ? 'success' : 'warning'}>{plan.isActive ? 'Active' : 'Inactive'}</Badge>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button size="icon-sm" variant="ghost" onClick={() => editPlan(plan)}><Edit3 size={14} /></Button>
                        <Button size="icon-sm" variant="danger" onClick={() => deletePlan(plan.id)}><Trash2 size={14} /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
