import { useContext, useEffect } from 'preact/compat';
import useSWR from 'swr';
import 'react-toastify/dist/ReactToastify.min.css';
import EditAccountForm, { Account as Acc, Discord, Github, Google } from './Forms/EditAccountForm';
import EditAccountInfosForm from './Forms/EditAccountInfosForm';
import { fetcher } from '../../../api/http';
import { config } from '../../../config/config';
import { NavContext } from '../AccountRouter';
import { useDark } from '../../../App';
import EditNewsAccoutInfosForm from './Forms/EditNewsAccoutInfosForm';
import { useTranslation } from 'react-i18next';


export type Account = {
    email: string;
    name: string;
    role: boolean;
}
export default function AccountContainer() {
    const { dark } = useDark();
    const { t } = useTranslation();

    const { setActive } = useContext(NavContext);
    useEffect(() => {
        setActive(window.location.pathname);
    }, []);
    const infos = window.location.pathname === '/account/';

    const { data, error, isLoading } = useSWR(
        `${config.privateapilink}/auth/isLogged?infos=${infos}`,
        fetcher,
    );
    if (!data || (error || isLoading)) {
        return <></>;
    }
    if (!data.status) {
        return <></>;
    }

    const myaccount: Acc = {
        email: data.data.email,
        name: data.data.name,
        role: data.data.role,
        discord: data.data.discord,
        github: data.data.github,
        newsletter: data.data.newsletter,
        google: data.data.google,
    };
    document.title = `Bagou450 - ${t('account.container.title')}`;
    return (

        <div className={'space-y-10 divide-y divide-gray-900/10'}>
            <div className='grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3'>
                <div className='px-4 sm:px-0'>
                    <h2 className={`${dark ? 'text-slate-200' : 'text-gray-900'} text-base font-semibold leading-7`}>{t('account.container.box1.title')}</h2>
                    <p className={`${dark ? 'text-slate-400' : 'text-gray-600'} -1 text-sm leading-6`}>
                        {t('account.container.box1.desc')}
                    </p>
                </div>

                <div
                    className={`${dark ? 'bg-bg450-dark' : 'bg-white'}  shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2`}>
                    <EditAccountForm account={myaccount} />

                </div>
            </div>

            <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
                <div className='px-4 sm:px-0'>
                    <h2 className={`${dark ? 'text-slate-200' : 'text-gray-900'} text-base font-semibold leading-7`}>{t('account.container.box2.title')}</h2>
                    <p className={`${dark ? 'text-slate-400' : 'text-gray-600'} -1 text-sm leading-6`}>{t('account.container.box2.desc')}</p>
                </div>
                <EditAccountInfosForm />
            </div>
            <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
                <div className='px-4 sm:px-0'>
                    <h2 className={`${dark ? 'text-slate-200' : 'text-gray-900'} text-base font-semibold leading-7`}>{t('account.container.box3.title')}</h2>
                    <p className={`${dark ? 'text-slate-400' : 'text-gray-600'} -1 text-sm leading-6`}>{t('account.container.box3.desc')}</p>
                </div>
                <div
                    className={`${dark ? 'bg-bg450-dark' : 'bg-white'} shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2`}>
                    <div className={'grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-x-2 md:gap-y-0 px-4 py-6 sm:p-8'}>
                        <Discord account={myaccount} />
                        <Google account={myaccount} />
                        <Github account={myaccount} />
                    </div>
                </div>

            </div>

            <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
                <div className='px-4 sm:px-0'>
                    <h2 className={`${dark ? 'text-slate-200' : 'text-gray-900'} text-base font-semibold leading-7`}>{t('account.container.box4.title')}</h2>
                    <p className={`${dark ? 'text-slate-400' : 'text-gray-600'} -1 text-sm leading-6`}>
                        {t('account.container.box4.desc')}
                    </p>
                </div>

                <div
                    className={`${dark ? 'bg-bg450-dark' : 'bg-white'}  shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2`}>
                    <EditNewsAccoutInfosForm account={myaccount} />

                </div>
            </div>
            {/*<div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                <div className="px-4 sm:px-0">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        We'll always let you know about important changes, but you pick what else you want to hear about.
                    </p>
                </div>

                <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="max-w-2xl space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                Comments
                                            </label>
                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                                Candidates
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="offers" className="font-medium text-gray-900">
                                                Offers
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    These are delivered via SMS to your mobile phone.
                                </p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                            Everything
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Same as email
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                            No push notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>*/}
        </div>

    );
}
