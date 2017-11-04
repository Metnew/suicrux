### Normalization
`normalizr` is recommended. Concept of normalization is strongly connected with state-management. The idea behind normalization is to make an in-memory DB inside the state. Think of it like NoSQL collection (table) in the state.

Typical script for arrays normalization:

```js
// @flow
import {normalize, schema} from 'normalizr'
import _ from 'lodash'

// NOTE: Normalization w/o normalizr may look like (very simple example):
// let normalizedData = {}
// for (let i = 0; i < result.length; i++) {
//   const post = result[i]
//   normalizedData[post.id] = post
// }
//
// NOTE: normalization is recommended
// But you still can write a bunch of custom code in your reducers to normalize every reqests

export const normalizeArrayOfItems = (array) => {
	// Flat array, if it had 2 levels of depth
	const flatArray = _.flatten(array)
	// Create schema for field, e.g field is `data`
	const dataSchema = new schema.Entity('data')
	// Create schema of list
	const dataListSchema = [dataSchema]
	// Normalize flatArray
	const normalizedData = normalize(flatArray, dataListSchema)
	// Get `data` entities
	const entities = normalizedData.entities.data
	const count = normalizedData.result.length
	return {entities, count}
}
```
