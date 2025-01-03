import { useState } from 'preact/compat';
import { BuildingOffice2Icon, PhoneIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import sendcontact from '../api/sendcontact';
import { useDark } from '../App';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';


export default function Contact() {
    const { t } = useTranslation();
    document.title = `Bagou450 | ${t('contact.title')}`;
    const form = object({
        firstname: string().required(t('contact.form.verification.firstname')),
        lastname: string().required(t('contact.form.verification.lastname')),
        email: string().required(t('contact.form.verification.email')),
        message: string().required(t('contact.form.verification.message')),
        phonenumber: string().optional(),
        society: string().optional(),
    });
    const [loading, setLoading] = useState<boolean>(false);
    const {dark} = useDark();
    const formik = useFormik({
        initialValues: { firstname: '', lastname: '', email: '', message: '', society: '', phonenumber: ''},
        validationSchema: form,
        onSubmit: (values) => {
            setLoading(true);
            if([values.firstname,values.lastname,values.email,values.message].includes('')) {
                toast.error(t('contact.toast.error1'), {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: dark ? 'dark' : 'light',
                });
                return setLoading(false);
            }
            let society = null;
            let phonenumber = null;

            if(values.society !== '') {
                society = values.society;
            }
            if(values.phonenumber !== '') {
                phonenumber = values.phonenumber;
            }
            sendcontact(values.firstname,values.lastname,values.email,values.message,society ? society : '',phonenumber ? phonenumber : '').then((data) => {
                if(data.data.status === 'success') {
                    return toast.success(t('contact.toast.success'), {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: dark ? 'dark' : 'light',
                    });
                }
                toast.error(t('contact.toast.error2'), {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: dark ? 'dark' : 'light',
                });
                return setLoading(false);
            }).catch((e) => {
                console.error(e);
                toast.error(t('contact.toast.error2'), {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: dark ? 'dark' : 'light',
                });
                return setLoading(false);
            });
        }
    });

    return (
        <>
            <Helmet>
                <meta name='description' content={t('contact.description')} />

                <meta name="twitter:description" content={t('contact.description')} />

                <meta property="og:description" content={t('contact.description')} />
            </Helmet>
            <div className={`${dark ? 'bg-bg450-lessdark' : 'bg-white'} lg:relative lg:isolate lg:h-screen`}>
                <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 lg:h-screen">
                    <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48 lg:h-screen">
                        <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
                            <div
                                className={`${dark ? 'bg-bg450-lessdark' : 'bg-gray-100'} absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-gray-900/10 lg:w-1/2`}>
                                {!dark ?
                                    <svg
                                        className='absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
                                        aria-hidden='true'
                                    >
                                        <defs>
                                            <pattern
                                                id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
                                                width={200}
                                                height={200}
                                                x='100%'
                                                y={-1}
                                                patternUnits='userSpaceOnUse'
                                            >
                                                <path d='M130 200V.5M.5 .5H200' fill='none' />
                                            </pattern>
                                        </defs>
                                        <rect width='100%' height='100%' strokeWidth={0} fill='white' />
                                        <svg x='100%' y={-1} className='overflow-visible fill-gray-50'>
                                            <path d='M-470.5 0h201v201h-201Z' strokeWidth={0} />
                                        </svg>
                                        <rect width='100%' height='100%' strokeWidth={0}
                                            fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)' />
                                    </svg>
                                    :
                                    <div
                                        className='absolute inset-x-0 -top-40 z-0 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none'
                                        aria-hidden='true'
                                    >
                                        <div
                                            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2d67d3] to-[#224fa3] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                                            style={{
                                                clipPath:
                                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                            }}
                                        />
                                    </div>
                                }
                            </div>

                            <h1 className={`${dark ? 'text-slate-200' : 'text-gray-900'} text-3xl font-bold tracking-tight`}><strong>{t('contact.title')}</strong></h1>
                            <h2 className={`${dark ? 'text-slate-300' : 'text-gray-600'} mt-6 text-lg leading-8`}>
                                {t('contact.subtitle1')} <br />
                                {t('contact.subtitle2')}
                            </h2>
                            <dl className='mt-10 space-y-4 text-base leading-7 text-gray-600'>
                                <div className='flex gap-x-4'>
                                    <dt className='flex-none'>
                                        <span className='sr-only'>Address</span>
                                        <BuildingOffice2Icon className='h-7 w-6 text-gray-400' aria-hidden='true' />
                                    </dt>
                                    <dd>
                                        <a href={'https://maps.app.goo.gl/VXDEzSbwpMxVtqvm8'} target={'_blank'}
                                            rel="noreferrer"
                                            className={dark ? 'text-slate-400' : 'text-gray-700'}
                                        > 2 rue des orchidées
                                            <br />
                                            35450 Dourdain, France</a>
                                    </dd>
                                </div>
                                <div className='flex gap-x-4'>
                                    <dt className='flex-none'>
                                        <span className='sr-only'>Telephone</span>
                                        <PhoneIcon className={`${dark ? 'text-slate-400' : 'text-gray-700'} h-7 w-6`} aria-hidden='true' />
                                    </dt>
                                    <dd>
                                        <p className={dark ? 'text-slate-400' : 'text-gray-700'}>
                                            <a href='tel:+33651975031'>+33 (0)6 51 97 50 31</a> / <a
                                                href='tel:+1 603-600-3503'>+1 603-600-3503</a>
                                        </p>
                                    </dd>
                                </div>
                                <div className='flex gap-x-4'>
                                    <dt className='flex-none'>
                                        <span className='sr-only'>Email</span>
                                        <EnvelopeIcon className={`${dark ? 'text-slate-400' : 'text-gray-700'} h-7 w-6`} aria-hidden='true' />
                                    </dt>
                                    <dd>
                                        <a className={dark ? 'text-slate-400' : 'text-gray-700'} href='mailto:contact@bagou450.com'>
                                            contact@bagou450.com
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <form action="#" method="POST" onSubmit={formik.handleSubmit}
                        className='px-6 pb-24 pt-12 sm:pb-32 lg:px-8 lg:py-48'>
                        <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
                            <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor='firstname'
                                        className={`${dark ? 'text-slate-300' : 'text-gray-900'} block text-sm leading-6 font-bold`}>
                                        {t('contact.form.firstname')}
                                    </label>
                                    <div className='mt-2.5'>
                                        <input
                                            type='text'
                                            name="firstname"
                                            onChange={formik.handleChange}
                                            id="firstname"
                                            autoComplete="given-name"
                                            className={`${dark ? 'bg-bg450-inputdark text-gray-300 ring-gray-500 placeholder:text-gray-500' : 'text-gray-900 ring-gray-300 placeholder:text-gray-400'}  w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-bg450-logo sm:text-sm sm:leading-6`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="lastname"
                                        className={`${dark ? 'text-slate-300' : 'text-gray-900'} block text-sm leading-6 font-bold`}>
                                        {t('contact.form.lastname')}
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="lastname"
                                            onChange={formik.handleChange}
                                            id="lastname"
                                            autoComplete="family-name"
                                            className={`${dark ? 'bg-bg450-inputdark text-gray-300 ring-gray-500 placeholder:text-gray-500' : 'text-gray-900 ring-gray-300 placeholder:text-gray-400'}  w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-bg450-logo sm:text-sm sm:leading-6`}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="society"
                                        className={`${dark ? 'text-slate-300' : 'text-gray-900'} block text-sm leading-6 font-bold`}>
                                        {t('contact.form.company')}
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="society"
                                            onChange={formik.handleChange}
                                            id="society"
                                            autoComplete="society"
                                            className={`${dark ? 'bg-bg450-inputdark text-gray-300 ring-gray-500 placeholder:text-gray-500' : 'text-gray-900 ring-gray-300 placeholder:text-gray-400'}  w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-bg450-logo sm:text-sm sm:leading-6`}
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="email"
                                        className={`${dark ? 'text-slate-300' : 'text-gray-900'} block text-sm leading-6 font-bold`}>
                                        {t('contact.form.email')}
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            id="email"
                                            autoComplete="email"
                                            className={`${dark ? 'bg-bg450-inputdark text-gray-300 ring-gray-500 placeholder:text-gray-500' : 'text-gray-900 ring-gray-300 placeholder:text-gray-400'}  w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-bg450-logo sm:text-sm sm:leading-6`}
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="phonenumber"
                                        className={`${dark ? 'text-slate-300' : 'text-gray-900'} block text-sm leading-6 font-bold`}>
                                        {t('contact.form.phone')}
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="tel"
                                            name="phonenumber"
                                            onChange={formik.handleChange}
                                            id="phonenumber"
                                            autoComplete="tel"
                                            className={`${dark ? 'bg-bg450-inputdark text-gray-300 ring-gray-500 placeholder:text-gray-500' : 'text-gray-900 ring-gray-300 placeholder:text-gray-400'}  w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-bg450-logo sm:text-sm sm:leading-6`}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message"
                                        className={`${dark ? 'text-slate-300' : 'text-gray-900'} block text-sm leading-6 font-bold`}>
                                        {t('contact.form.message')}
                                    </label>
                                    <div className="mt-2.5">
                                        <textarea
                                            name="message"
                                            onChange={formik.handleChange}
                                            id="message"
                                            rows={4}
                                            className={`${dark ? 'bg-bg450-inputdark text-gray-300 ring-gray-500 placeholder:text-gray-500' : 'text-gray-900 ring-gray-300 placeholder:text-gray-400'}  w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-bg450-logo sm:text-sm sm:leading-6`}
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    onClick={() => {
                                        if (formik.errors.firstname || formik.errors.lastname || formik.errors.message || formik.errors.email) {
                                            toast.error(t('contact.toast.error1.'), {
                                                position: 'bottom-right',
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: dark ? 'dark' : 'light',
                                            });
                                        }
                                    }}
                                    className={` rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-bg450-logohover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? 'bg-b450-logodisabled' : 'bg-bg450-logo'}`}
                                >
                                    {t('contact.form.button')}
                                </button>
                            </div>
                            
                        </div>

                    </form>
                 
                </div>
            </div>

        </>
    );
}
