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
	external?: boolean,
	lazy?: boolean,
	strict?: boolean,
	icon?: string,
	name?: string,
	sidebarVisible?: boolean,
	tag?: React$Node | Function,
	component?: React$Node | Function
}

export type i18nConfigObject = {
	messages: Object,
	localeData: Object,
	locale: string,
	lang?: string
}
