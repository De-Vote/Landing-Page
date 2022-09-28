import '../styles/globals.css'
import React, { useEffect, useState } from "react";
import AppContext from '../context/AppContext';
import '../styles/header.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VoteData from "../public/voteData.json"
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next';
import SSRProvider from 'react-bootstrap/SSRProvider';
import Cookies from 'js-cookie'
import '../styles/progressbar.css'
import 'react-multi-email-input/dist/style.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [result, setResult] = useState(VoteData)
  const [shares, setShares] = useState(2)
  const [role, setRole] = useState(null)
  const [voting, setVoting] = useState(false)
  const [ownedVotes, setOwnedVotes] = useState([])
  const [voteId, setVoteId] = useState(null)
  const getLayout = Component.getLayout || ((page) => page);
  function logout(message) {
    setRole(null)
    setUser(null)
    Cookies.remove('token')
    Cookies.remove('userinfo')
    toast(message)
    router.push("/")
  }
  async function backToHome() {
    router.push("/vote", `/vote`)
  }
  return (
      <AppContext.Provider value={{
        user: user,
        setUser: setUser,
        role: role,
        setRole: setRole,
        voting: voting,
        result: result,
        ownedVotes: ownedVotes,
        setOwnedVotes: setOwnedVotes,
        logout: logout,
        voteId: voteId,
        setVoteId: setVoteId,
        backToHome: backToHome
      }}>
    <SSRProvider>
    {getLayout( <>
        <ToastContainer position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
        {/* <Component {...pageProps} /> */}
        <Component {...pageProps} /></>)}
      </SSRProvider>
      </AppContext.Provider>
  )
}

export default appWithTranslation(MyApp)
