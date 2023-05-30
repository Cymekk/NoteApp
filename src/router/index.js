import { createRouter, createWebHashHistory } from 'vue-router'
import NotesView from '@/views/NotesView'
import EditNoteView from '@/views/EditNoteView'
import AuthView from '@/views/AuthView'
import { useStoreAuth } from '../store/storeAuth'

const routes = [
	{
		path: '/',
		name: 'notes',
		component: NotesView,
	},
	{
		path: '/edit/:id',
		name: 'editnote',
		component: EditNoteView,
	},
	{
		path: '/auth',
		name: 'auth',
		component: AuthView,
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach(async (to, from) => {
	const storeAuth = useStoreAuth()
	if (!storeAuth.user.id && to.name !== 'auth') {
		return { name: 'auth' }
	}

	if (storeAuth.user.id && to.name === 'auth') {
		return false
	}
})

export default router
