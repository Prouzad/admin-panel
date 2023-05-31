import { IBreadCumb } from '@/types'

export const requestsCrumb: IBreadCumb = {
  title: 'Requests',
  pageRoute: [
    {
      link: 'requests',
      title: 'Requests',
    },
  ],
}

export const requesetDescriptionCrumb: IBreadCumb = {
  title: 'Description',
  pageRoute: [
    {
      link: 'requests',
      title: 'Requests',
    },
    {
      link: '',
      title: 'Description',
    },
  ],
}

export const advertCyclesCrumb: IBreadCumb = {
  title: 'Advert cycles',
  pageRoute: [
    {
      link: 'list-cycles',
      title: 'Advert cycles',
    },
  ],
}
export const advertCyclesDescriptionCrumb: IBreadCumb = {
  title: 'Description',
  pageRoute: [
    {
      link: 'list-cycles',
      title: 'Advert cycles',
    },
    {
      link: '',
      title: 'Description',
    },
  ],
}

export const agenciesCrumb: IBreadCumb = {
  title: 'Agencies',
  pageRoute: [
    {
      link: 'agencies',
      title: 'Agencies',
    },
  ],
}
export const contractsCrumb: IBreadCumb = {
  title: 'Contracts',
  pageRoute: [
    {
      link: 'contracts',
      title: 'Contracts',
    },
  ],
}
