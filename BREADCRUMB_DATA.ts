export interface IBreadCumb {
  description: string
  title: string
  pageRoute: {
    link: string
    title: string
  }[]
}

export const requestsCrumb: IBreadCumb = {
  description:
    'For you to have detailed information about a given advertising offer',
  title: 'Requests',
  pageRoute: [
    {
      link: 'requests',
      title: 'Requests',
    },
  ],
}

export const requesetDescriptionCrumb: IBreadCumb = {
  description:
    'For you to have detailed information about a given advertising offer',
  title: 'Descripton',
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
  description:
    'For you to have detailed information about a given advertising offer',
  title: 'Advert cycles',
  pageRoute: [
    {
      link: 'list-cycles',
      title: 'Advert cycles',
    },
  ],
}
export const advertCyclesDescriptionCrumb: IBreadCumb = {
  description:
    'For you to have detailed information about a given advertising offer',
  title: 'Advert cycles',
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
  description: 'Welcome to the Create New Agencies and Agency Staff window',
  title: 'Agencies',
  pageRoute: [
    {
      link: 'agencies',
      title: 'Agencies',
    },
  ],
}
export const contractsCrumb: IBreadCumb = {
  description:
    'For you to have detailed information about a given advertising offer',
  title: 'Contracts',
  pageRoute: [
    {
      link: 'contracts',
      title: 'Contracts',
    },
  ],
}
