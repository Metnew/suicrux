// @flow
import type {State as AuthState} from 'reducers/auth'
import type {State as LayoutState} from 'reducers/layout'
import type {State as EntitiesPostsState} from 'reducers/posts'
import type {State as EntitiesUsersState} from 'reducers/users'
import type {GlobalState} from 'reducers'

export const getAuthState = (state: GlobalState): AuthState => state.me.auth
export const getLayoutState = (state: GlobalState): LayoutState => state.layout
export const getEntitiesPostsState = (state: GlobalState): EntitiesPostsState => state.entities.posts
export const getEntitiesUsersState = (state: GlobalState): EntitiesUsersState => state.entities.users
