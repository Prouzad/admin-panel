import dayjs from 'dayjs'

import { IForm } from '@/types'

import filterFileEmpty from '../FilterFunctions/FilterEmptyFiles'
import { createAgency, createAgent } from '../services'

export const filterEmptyValues = (obj: Partial<IForm>) => {
  if (obj !== undefined && obj !== null) {
    const filteredEntries = Object.entries(obj).filter(([_, value]) => {
      return value !== '' && value !== null && value !== undefined
    })
    return Object.fromEntries(filteredEntries)
  }
  return null
}

export const handleResetAgent = (
  setEditingKey: any,
  setAddAgent: any,
  formRef2: any
) => {
  setEditingKey('')
  setAddAgent(false)
  formRef2.current.resetFields()
}

export const setFieldsObj = (er: Partial<IForm>) => {
  let keys!: keyof IForm
  const arr = []
  for (keys in er) {
    let inputValue
    if (keys === 'phone_number') {
      inputValue = er[keys]?.replace(/\+/g, '')
    } else {
      inputValue = er[keys]
    }
    arr.push({
      name: keys,
      value: inputValue,
    })
  }
  return arr
}

export const getDateObj = async (values: IForm) => {
  const data = {
    ...values,
  }
  data.agent_phone_number = `+${values.agent_phone_number}`
  data.phone_number = `+${values.phone_number}`
  data.contract_date = `${dayjs(values.contract_date).format('YYYY-MM-DD')}`
  data.contract_finished_date = `${dayjs(values.contract_finished_date).format(
    'YYYY-MM-DD'
  )}`

  if (values.logo) {
    data.logo = await filterFileEmpty(values?.logo)
  }

  if (values.contract_file) {
    data.contract_file = await filterFileEmpty(values?.contract_file)
  }

  return filterEmptyValues(data)
}

export const createAgencyOnFinish = async (
  values: any,
  session: any,
  resonseAnswerMessage: (type: string, message: string) => void,
  setIsOpen: any,
  formRef: any,
  t: any
) => {
  const result = await getDateObj(values)

  await createAgency(result, session?.user?.accessToken)
    .then(() => {
      resonseAnswerMessage('success', t('the-agency-has-successfully-created'))
      setIsOpen(false)
      formRef.current.resetFields()
    })
    .catch((err) => {
      resonseAnswerMessage(
        'error',
        t(
          'an-error-occurred-while-creating-the-agency-please-fix-and-try-again'
        )
      )
      const setErrorObj = (er: Partial<IForm>) => {
        let keys!: keyof IForm
        const arr = []
        for (keys in er) {
          arr.push({
            name: keys,
            errors: [er[keys]],
          })
        }
        return arr
      }
      formRef.current.setFields(setErrorObj(err.response.data))
    })
}
export const createAgentInModal = async (
  values,
  session,
  resonseAnswerMessage,
  setIsuccessAgent,
  formRef2,
  isEdithItem,
  t: any
) => {
  const body = {
    role: values.agent_role?.trim(),
    phone_number: `+${values.agent_phone_number}`,
    agency: isEdithItem,
  }

  const response = filterEmptyValues(body)
  await createAgent(response, session?.user.accessToken)
    .then((res: any) => {
      resonseAnswerMessage('success', 'Агент успешно создано!')
      setIsuccessAgent(res)
      formRef2.current.resetFields()
    })
    .catch((err) => {
      resonseAnswerMessage('error', t('create_agent_error'))
      const setErrorObj = (er: Partial<IForm>) => {
        let keys!: keyof IForm
        const arr = []
        for (keys in er) {
          if (keys !== 'phone_number') {
            arr.push({
              name: keys,
              errors: [er[keys]],
            })
          } else {
            arr.push({
              name: 'agent_phone_number',
              errors: [er[keys]],
            })
          }
        }
        return arr
      }
      formRef2.current.setFields(setErrorObj(err.response.data))
    })
}
