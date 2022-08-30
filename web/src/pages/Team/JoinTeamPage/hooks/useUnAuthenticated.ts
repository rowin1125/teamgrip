import { useState, useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'

export const useUnAuthenticated = () => {
  const { invitationToken, ghostInvitation } = useParams()

  const [loading, setLoading] = useState(false)
  const { logIn, signUp } = useAuth()

  useEffect(() => {
    if (invitationToken) return

    toast.error('Je hebt geen uitnodigingstoken')
  }, [invitationToken])

  const handleSignUp = async (data, actions) => {
    setLoading(true)
    const response = await signUp({ ...data, invitationToken, ghostInvitation })

    if (response.message) {
      toast.success(response.message)
      actions.resetForm()
    } else if (response.error) {
      toast.error(response.error)
    }
    setLoading(false)
  }

  const handleSignIn = async (data) => {
    setLoading(true)
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back 🥳')
    }
    setLoading(false)
  }

  return {
    handleSignIn,
    handleSignUp,
    loading,
  }
}
