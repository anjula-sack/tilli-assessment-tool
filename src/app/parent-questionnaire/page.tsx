'use client'
import Link from 'next/link'
import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { addParentQuestionnaire } from '@/services/appwrite'
import LanguageDropdown from '../components/languageDropdown'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ParentQuestionnaire />
    </Suspense>
  )
}

function ParentQuestionnaire() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const studentId = searchParams.get('studentId')

  const [formData, setFormData] = useState({
    // Section 1: Demographic details
    parentName: '',
    childSex: '',
    childDob: '',
    repeatedGrade: '',
    hearingDifficulty: '',
    rememberingDifficulty: '',
    communicationDifficulty: '',
    // Section 2: Understanding your child
    q1_feelings: '',
    q2_preferences: '',
    q3_persistence: '',
    q4_help_seeking: '',
    q5_empathy: '',
    q6_comforting: '',
    q7_problem_solving: '',
    q8_self_regulation: '',
    q9_impulse_control: '',
    q10_self_awareness: '',
    q11_learning_goals: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await addParentQuestionnaire(formData, studentId!)
      router.push(`/instructions?studentId=${studentId}`)
    } catch (err) {
      console.error(err)
      setError(t('parentQuestionnaire.error'))
    } finally {
      setIsLoading(false)
    }
  }

  const understandingQuestions = [
    {
      key: 'q1_feelings',
      question: t('parentQuestionnaire.questions.q1'),
    },
    {
      key: 'q2_preferences',
      question: t('parentQuestionnaire.questions.q2'),
    },
    {
      key: 'q3_persistence',
      question: t('parentQuestionnaire.questions.q3'),
    },
    {
      key: 'q4_help_seeking',
      question: t('parentQuestionnaire.questions.q4'),
    },
    {
      key: 'q5_empathy',
      question: t('parentQuestionnaire.questions.q5'),
    },
    {
      key: 'q6_comforting',
      question: t('parentQuestionnaire.questions.q6'),
    },
    {
      key: 'q7_problem_solving',
      question: t('parentQuestionnaire.questions.q7'),
    },
    {
      key: 'q8_self_regulation',
      question: t('parentQuestionnaire.questions.q8'),
    },
    {
      key: 'q9_impulse_control',
      question: t('parentQuestionnaire.questions.q9'),
    },
    {
      key: 'q10_self_awareness',
      question: t('parentQuestionnaire.questions.q10'),
    },
    {
      key: 'q11_learning_goals',
      question: t('parentQuestionnaire.questions.q11'),
    },
  ]

  const answerOptions = [
    t('parentQuestionnaire.never'),
    t('parentQuestionnaire.sometimes'),
    t('parentQuestionnaire.mostOfTheTime'),
    t('parentQuestionnaire.almostAlways'),
  ]

  return (
    <section>
      <title>{t('parentQuestionnaire.title')}</title>
      <div className="bg-primary-400 w-full px-4">
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <p className="text-md md:text-xl text-white font-semibold p-3">
              {t('parentQuestionnaire.navbarTitle')}
            </p>
          </Link>
          <LanguageDropdown />
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center justify-center px-4 md:px-6 py-4 md:py-8 text-gray-500 overflow-auto min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl p-4 w-full max-w-md md:max-w-lg mt-4 space-y-4 md:space-y-6"
        >
          <p className="text-center text-base font-semibold text-gray-700">
            {t('parentQuestionnaire.onlyParents')}
          </p>

          {/* Section 1: Demographic Details */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm flex items-center">
              <div className="w-4 h-12 bg-primary-400 rounded-l-lg mr-2"></div>
              <h2 className="text-md font-semibold text-gray-700">
                {t('parentQuestionnaire.section1')}
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-4">
              <label className="block text-gray-700 font-semibold mb-2">
                {t('parentQuestionnaire.parentName')}
              </label>
              <input
                type="text"
                name={'parentName'}
                value={formData.parentName}
                onChange={handleChange}
                placeholder={t('parentQuestionnaire.yourAnswer')}
                className="block w-full rounded-full bg-gray-200 p-2 px-4 text-gray-700 placeholder-gray-400 font-medium"
              />
            </div>

            {/* Select for Sex */}
            <div className="bg-white rounded-2xl p-4">
              <label className="block text-gray-700 font-semibold mb-2">
                {t('parentQuestionnaire.childSex')}
              </label>
              <select
                name="childSex"
                value={formData.childSex}
                onChange={handleChange}
                className="block w-full rounded-full bg-gray-200 p-2 px-4 text-gray-700 font-medium"
              >
                <option value="">{t('parentQuestionnaire.choose')}</option>
                <option value="Female">
                  {t('parentQuestionnaire.female')}
                </option>
                <option value="Male">{t('parentQuestionnaire.male')}</option>
                <option value="Other">{t('parentQuestionnaire.other')}</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="bg-white rounded-2xl p-4">
              <label className="block text-gray-700 font-semibold mb-2">
                {t('parentQuestionnaire.childDob')}
              </label>
              <input
                type="date"
                name="childDob"
                value={formData.childDob}
                onChange={handleChange}
                className="block w-full rounded-full bg-gray-200 p-2 px-4 text-gray-700 font-medium"
              />
            </div>

            {/* Radio Groups */}
            {[
              {
                key: 'repeatedGrade',
                label: t('parentQuestionnaire.repeatedGrade'),
              },
              {
                key: 'hearingDifficulty',
                label: t('parentQuestionnaire.hearingDifficulty'),
              },
              {
                key: 'rememberingDifficulty',
                label: t('parentQuestionnaire.rememberingDifficulty'),
              },
              {
                key: 'communicationDifficulty',
                label: t('parentQuestionnaire.communicationDifficulty'),
              },
            ].map(({ key, label }) => (
              <div className="bg-white rounded-2xl p-4" key={key}>
                <p className="text-gray-700 font-semibold mb-2">{label}</p>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={key}
                      value="Yes"
                      checked={formData[key as keyof typeof formData] === 'Yes'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {t('parentQuestionnaire.yes')}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={key}
                      value="No"
                      checked={formData[key as keyof typeof formData] === 'No'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {t('parentQuestionnaire.no')}
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: Understanding your child */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm flex items-center">
              <div className="w-4 h-12 bg-primary-400 rounded-l-lg mr-2"></div>
              <h2 className="text-md font-semibold text-gray-700">
                {t('parentQuestionnaire.section2')}
              </h2>
            </div>

            {understandingQuestions.map(({ key, question }) => (
              <div className="bg-white rounded-2xl p-4" key={key}>
                <p className="text-gray-700 font-semibold mb-3">{question}</p>
                <div className="space-y-2">
                  {answerOptions.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name={key}
                        value={option}
                        checked={
                          formData[key as keyof typeof formData] === option
                        }
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={!formData.parentName || isLoading}
              className="rounded-2xl bg-primary-700 px-6 py-2 font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
            >
              {isLoading
                ? t('parentQuestionnaire.submitting')
                : t('parentQuestionnaire.submit')}
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}
