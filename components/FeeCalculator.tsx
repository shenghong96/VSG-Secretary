import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const FeeCalculator = () => {
    const { t } = useTranslation();
    const [revenue, setRevenue] = useState<number | ''>('');
    const [assets, setAssets] = useState<number | ''>('');
    const [expenses, setExpenses] = useState<number | ''>('');

    const [auditFee, setAuditFee] = useState<number>(0);
    const [taxFee, setTaxFee] = useState<number>(0);
    const [auditProfFee, setAuditProfFee] = useState<number>(0);
    const [taxProfFee, setTaxProfFee] = useState<number>(0);
    const [accountingFeeRange, setAccountingFeeRange] = useState<string>('');

    const calculateFees = () => {
        const r = Number(revenue) || 0;
        const a = Number(assets) || 0;
        const e = Number(expenses) || 0;
        const financialLevel = Math.max(r, a, e);

        // 1. Audit Fee
        let calculatedAuditFee = 0;
        if (financialLevel <= 500000) calculatedAuditFee = 1500;
        else if (financialLevel <= 1000000) calculatedAuditFee = 2000;
        else if (financialLevel <= 2000000) calculatedAuditFee = 3000;
        else if (financialLevel <= 3000000) calculatedAuditFee = 4000;
        else if (financialLevel <= 4000000) calculatedAuditFee = 5000;
        else if (financialLevel <= 5000000) calculatedAuditFee = 6000;
        else if (financialLevel <= 6000000) calculatedAuditFee = 7000;
        else if (financialLevel <= 7000000) calculatedAuditFee = 8000;
        else if (financialLevel <= 8000000) calculatedAuditFee = 9000;
        else if (financialLevel <= 9000000) calculatedAuditFee = 10000;
        else if (financialLevel <= 10000000) calculatedAuditFee = 11000;
        else calculatedAuditFee = 0; // To be assessed

        // 2. Tax Fee
        let calculatedTaxFee = 0;
        if (financialLevel <= 500000) calculatedTaxFee = 1200;
        else if (financialLevel <= 1000000) calculatedTaxFee = 1500;
        else if (financialLevel <= 2000000) calculatedTaxFee = 1800;
        else if (financialLevel <= 3000000) calculatedTaxFee = 2100;
        else if (financialLevel <= 4000000) calculatedTaxFee = 2400;
        else if (financialLevel <= 5000000) calculatedTaxFee = 2700;
        else if (financialLevel <= 6000000) calculatedTaxFee = 3000;
        else if (financialLevel <= 7000000) calculatedTaxFee = 3300;
        else if (financialLevel <= 8000000) calculatedTaxFee = 3500;
        else if (financialLevel <= 9000000) calculatedTaxFee = 4000;
        else if (financialLevel <= 10000000) calculatedTaxFee = 4500;
        else calculatedTaxFee = 0; // To be assessed

        // 3. Professional Fee Lookup
        const getProfFee = (baseFee: number, type: 'audit' | 'tax') => {
            if (baseFee === 0) return 0;
            if (baseFee <= 1000) return 150;
            if (baseFee <= 1999) return type === 'audit' ? 200 : 150;
            if (baseFee <= 2999) return type === 'audit' ? 250 : 200;
            if (baseFee <= 3999) return type === 'audit' ? 300 : 230;
            if (baseFee <= 4999) return type === 'audit' ? 350 : 250;
            if (baseFee <= 5999) return type === 'audit' ? 400 : 300;
            if (baseFee <= 6999) return type === 'audit' ? 450 : 300;
            if (baseFee <= 7999) return type === 'audit' ? 500 : 300;
            if (baseFee <= 8999) return type === 'audit' ? 550 : 300;
            if (baseFee <= 9999) return type === 'audit' ? 600 : 350;
            if (baseFee <= 12999) return type === 'audit' ? 650 : 350;
            return type === 'audit' ? 0 : 400; // > 13000
        };

        const calcAuditProf = getProfFee(calculatedAuditFee, 'audit');
        const calcTaxProf = getProfFee(calculatedTaxFee, 'tax');

        setAuditFee(calculatedAuditFee);
        setTaxFee(calculatedTaxFee);
        setAuditProfFee(calcAuditProf);
        setTaxProfFee(calcTaxProf);

        // 4. Accounting Fee (Based on Revenue)
        if (r < 500000) setAccountingFeeRange('RM300 - RM800');
        else if (r <= 2000000) setAccountingFeeRange('RM800 - RM2,000');
        else setAccountingFeeRange('RM2,000 - RM5,000+');
    };

    useEffect(() => {
        calculateFees();
    }, [revenue, assets, expenses]);

    const formatCurrency = (val: number) => val === 0 ? t('components.feeCalculator.toBeAssessed') : `RM${val.toLocaleString()}`;
    const formatTotal = (val: number) => val === 0 ? t('components.feeCalculator.contactForQuote') : `RM${val.toLocaleString()}`;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 bg-slate-900 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">calculate</span>
                    {t('components.feeCalculator.title')}
                </h3>
                <p className="text-slate-400 text-sm mt-1">{t('components.feeCalculator.subtitle')}</p>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4">{t('components.feeCalculator.financialsTitle')}</h4>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('components.feeCalculator.totalAssets')}</label>
                        <input
                            type="number"
                            value={assets}
                            onChange={(e) => setAssets(Number(e.target.value))}
                            placeholder="e.g. 500000"
                            className="w-full rounded-lg border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('components.feeCalculator.totalRevenue')}</label>
                        <input
                            type="number"
                            value={revenue}
                            onChange={(e) => setRevenue(Number(e.target.value))}
                            placeholder="e.g. 600000"
                            className="w-full rounded-lg border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('components.feeCalculator.totalExpenses')}</label>
                        <input
                            type="number"
                            value={expenses}
                            onChange={(e) => setExpenses(Number(e.target.value))}
                            placeholder="e.g. 400000"
                            className="w-full rounded-lg border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />
                    </div>

                    <div className="pt-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-slate-600 dark:text-slate-400">
                            <p>{t('components.feeCalculator.note')}</p>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-4">{t('components.feeCalculator.estimatedFeesTitle')}</h4>

                    {/* Accounting */}
                    <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">{t('components.feeCalculator.accounting.title')}</p>
                            <p className="text-xs text-slate-500">{t('components.feeCalculator.accounting.subtitle')}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-primary">{accountingFeeRange}</p>
                            <p className="text-xs text-slate-500">{t('components.feeCalculator.accounting.unit')}</p>
                        </div>
                    </div>

                    {/* Audit */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white">{t('components.feeCalculator.audit.title')}</p>
                                <p className="text-xs text-slate-500">{t('components.feeCalculator.audit.subtitle')}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(auditFee)}</p>
                            </div>
                        </div>
                        {auditFee > 0 && (
                            <div className="flex justify-between items-center text-sm border-t border-dashed border-slate-200 dark:border-slate-600 pt-2 mt-2">
                                <span className="text-slate-600 dark:text-slate-400">{t('components.feeCalculator.audit.surcharge')}</span>
                                <span className="font-medium text-slate-700 dark:text-slate-300">+{formatCurrency(auditProfFee)}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-600 pt-2 mt-2">
                            <span>{t('components.feeCalculator.audit.total')}</span>
                            <span>{formatTotal(auditFee + auditProfFee)}</span>
                        </div>
                    </div>

                    {/* Tax */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white">{t('components.feeCalculator.tax.title')}</p>
                                <p className="text-xs text-slate-500">{t('components.feeCalculator.tax.subtitle')}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(taxFee)}</p>
                            </div>
                        </div>
                        {taxFee > 0 && (
                            <div className="flex justify-between items-center text-sm border-t border-dashed border-slate-200 dark:border-slate-600 pt-2 mt-2">
                                <span className="text-slate-600 dark:text-slate-400">{t('components.feeCalculator.tax.surcharge')}</span>
                                <span className="font-medium text-slate-700 dark:text-slate-300">+{formatCurrency(taxProfFee)}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-600 pt-2 mt-2">
                            <span>{t('components.feeCalculator.tax.total')}</span>
                            <span>{formatTotal(taxFee + taxProfFee)}</span>
                        </div>
                    </div>

                    <p className="text-xs text-center text-slate-400 mt-4">
                        {t('components.feeCalculator.disclaimer')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeeCalculator;
