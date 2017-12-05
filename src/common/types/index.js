// @flow
export type LinkItem = {
	link: string,
	header: string,
	desc: string,
	icon: string
}

export type RouteItem = {
	path: string,
	exact?: boolean,
	strict?: boolean,
	tag: React$Node,
  // RR4 <Redirect /> doesn't have component property
	component?: React$Node,
	external?: boolean,
	meta: {
		icon?: string,
		name?: string,
		sidebarVisible?: boolean,
	}
}

export type i18nConfigObject = {
	messages: Object,
	localeData: Object,
	locale: string,
	lang?: string
}
