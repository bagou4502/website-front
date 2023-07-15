import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import editAccount from '../../../../api/account/editAccount';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import debounce from 'lodash.debounce';
import { fetcher } from '../../../../api/http';
import Spinner from "../../../Elements/Spinner";
import Loading from "../../../Elements/Loading";
import Login from "../../../Auth/Login";
import tokenLogin from "../../../../api/auth/tokenLogin";
import loginOauth from "../../../../api/auth/loginOauth";
import linkOauth from "../../../../api/account/linkOauth";
import AccountContainer from "../AccountContainer";
import Cookies from "js-cookie";
import deleteOauth from "../../../../api/account/deleteOauth";

const form = object({
    email: string().email('This is not a valid email.').required('')
  });


type DiscordUser = {
  avatar: string;
  username: string;
  id: string;
  discriminator: string;
}
type GoogleUser = {
  avatar: string;
  username: string;
}
type GithubUser = {
  avatar: string;
  username: string;
  plan: string;
}
type Discord = {
  status: boolean;
  data: DiscordUser;
}
type Google = {
  status: boolean;
  data: GoogleUser;
}
type Github = {
  status: boolean;
  data: GithubUser;
}

export type Account = {
  email: string;
  name: string;
  role: boolean;
  discord: Discord;
  google: Google;
  github: Github;
}

/**const { mutate } = useSWR(
  `https://privateapi.bagou450.com/api/client/web/auth/isLogged`,
  fetcher
);**/
export default function EditAccountForm({account}: {account: Account}) {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, showError] = useState<string>();

    const changeEmail = debounce((value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(value)) {
        showError('This email is invalid.')
        return;
      }
      showError('')
      if(value === account.email) {
        return;
      }
      setLoading(true)
      editAccount(value).then((data) => {
        if(data.data['status'] === 'error') {
          toast.error(data.data['message'], {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.success('Success! Your informations was edited.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });


        }
        setLoading(false)
      }).catch((e) => {
        toast.error('An unexcepted error happend. Please contact one of our support team.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false)
      })
    }, 500)
  return (
        <section className='my-4 rounded-lg' >
            <h2 className='text-2xl my-4 text-center'>Edit your address information</h2>
                <div>
            <label className="label">
            <span className="label-text">Your Email</span>
          </label>
            <input id="email"
              name="email"
              defaultValue={account.email}
              type="email"
              disabled={loading}

              placeholder="exemple@exemple.com"
              onChange={(e) => changeEmail(e.target.value)}
              required
              className="input input-bordered w-full mr-4" />
              <label className="label">
                <span className='text-red-500'>{error}</span>
              </label>
              </div>

        <div className={'grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-x-2 md:gap-y-0'}>

          <Discord account={account}/>
          <Google account={account}/>
          <Github account={account}/>
        </div>
        </section>
    )
}

function Discord({account}: {account: Account}) {
  const discord = account.discord;
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWR(
    `https://privateapi.bagou450.com/api/client/web/auth/isLogged?infos=true`,
    fetcher
  );
  const discordLink = (() => {
    setLoading(true);
    linkOauth('discord').then((data) => {
      window.location.href = data.data.data.url

    })
  })
  const discordUnlink = (() => {
    setLoading(true);
    deleteOauth('discord').then((data) => {
        if(data.data['status'] === 'success') {
          toast.success(`You have unlinked your Discord account successfully!`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          mutate();
          setLoading(false);
        } else {
          toast.error(`Error: ${data.data['message']}`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          mutate();
          setLoading(false);
        }
    })
  })
  return (
    <div>
    <h2 className='text-2xl my-4 text-center'>{discord.status ? "Your Discord account" : "Link your Discord Account"}</h2>
  <div className={'mx-auto text-center mt-4 flex space-x-8 w-full'}>
    {discord.status ?
      (<div className={'mx-auto'}>

        <div>
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={discord.data.avatar} />
            </div>
          </div>
        </div>


        <div>
          <h2 className={'mt-2'}>{discord.data.username}{discord.data.discriminator !== '0' && `#${discord.data.discriminator}`}</h2>

          <button className="mt-2 btn btn-outline btn-error border-0 mt-4" disabled={loading} onClick={() => discordUnlink()}>Unlink Discord account</button>
        </div>
      </div>
      )
      :
      <div className={'mx-auto'}>
        <button className="mt-2 btn-neutral btn-outline btn border-0 mt-4" disabled={loading} onClick={() => discordLink()}>Link Discord account</button>
      </div>

    }
      </div>

    </div>
  )
}

function Google({account}: {account: Account}) {
  const google = account.google
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWR(
    `https://privateapi.bagou450.com/api/client/web/auth/isLogged?infos=true`,
    fetcher
  );
  const googleLink = (() => {
    setLoading(true);
    linkOauth('google').then((data) => {
      window.location.href = data.data.data.url

    })
  })
  const googleUnlink = (() => {
    setLoading(true);
    deleteOauth('google').then((data) => {
      if(data.data['status'] === 'success') {
        toast.success(`You have unlinked your Google account successfully!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        mutate();
        setLoading(false);
      } else {
        toast.error(`Error: ${data.data['message']}`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        mutate();
        setLoading(false);
      }
    })
  })
  return (
    <div>
      <h2 className='text-2xl my-4 text-center'>{google.status ? "Your Google account" : "Link your Google Account"}</h2>
      <div className={'mx-auto text-center mt-4 flex space-x-8 w-full'}>
        {google.status ?
          (<div className={'mx-auto'}>

              <div>
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={google.data.avatar} />
                  </div>
                </div>
              </div>


              <div>
                <h2 className={'mt-2'}>{google.data.username}</h2>

                <button className="mt-2 btn btn-outline btn-error border-0 mt-4" disabled={loading} onClick={() => googleUnlink()}>Unlink Google account</button>
              </div>
            </div>
          )
          :
          <div className={'mx-auto'}>
            <button className="mt-2 btn-outline btn-neutral btn border-0 mt-4" disabled={loading} onClick={() => googleLink()}>Link Google account</button>
          </div>

        }
      </div>

    </div>
  )
}

function Github({account}: {account: Account}) {
  const github = account.github;
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWR(
    `https://privateapi.bagou450.com/api/client/web/auth/isLogged?infos=true`,
    fetcher
  );
  const githubLink = (() => {
    setLoading(true);
    linkOauth('github').then((data) => {
      window.location.href = data.data.data.url

    })
  })
  const githubUnlink = (() => {
    setLoading(true);
    deleteOauth('github').then((data) => {
      if(data.data['status'] === 'success') {
        toast.success(`You have unlinked your Github account successfully!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        mutate();
        setLoading(false);
      } else {
        toast.error(`Error: ${data.data['message']}`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        mutate();
        setLoading(false);
      }
    })
  })
  return (
    <div>
      <h2 className='text-2xl my-4 text-center'>{github.status ? "Your Github account" : "Link your Github Account"}</h2>
      <div className={'mx-auto text-center mt-4 flex space-x-8 w-full'}>
        {github.status ?
          (<div className={'mx-auto'}>

              <div>
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={github.data.avatar} />
                  </div>
                </div>
              </div>


              <div>
                <h2 className={'mt-2'}>{github.data.username} {github.data.plan === 'pro' && <span className="badge badge-secondary badge-outline mr-2">Pro</span>}</h2>

                <button className="mt-2 btn btn-outline btn-error border-0 mt-4" disabled={loading} onClick={() => githubUnlink()}>Unlink Github account</button>
              </div>
            </div>
          )
          :
          <div className={'mx-auto'}>
            <button className="mt-2 btn-outline btn-neutral btn border-0 mt-4" disabled={loading} onClick={() => githubLink()}>Link Github account</button>
          </div>

        }
      </div>

    </div>
  )
}

export function AccountLinkOauthCallback() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type')
  const code = urlParams.get('code');
  const { mutate } = useSWR(
    `https://privateapi.bagou450.com/api/client/web/auth/isLogged?infos=true`,
    fetcher
  );
  const fetchUrl = `https://privateapi.bagou450.com/api/client/web/account/oauthCallback?token=${code}&type=${type}`;
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('access_token')}`
          }});
        const data = await response.json();
        setLoading(false);
        if (data.status === 'success') {
          toast.success(`You have linked your ${type} account successfully!`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          mutate();
        } else {
          const message = data.message ? data.message : 'An unexpected error happened.';
          toast.error(`Error: ${message}`, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          mutate();
        }
      } catch (error) {
        setLoading(false);
        toast.error('An unexpected error occurred.', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        mutate();
      }
    };
    fetchData();
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={'flex flex-col items-center justify-center h-full'}>
      <AccountContainer/>
    </div>
  )
}