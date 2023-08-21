import { HomeIcon, OpenFolder, keywords, Posts } from '../components/Icons'

export const ADMIN_ROUTES = {
  administracion: {
    label: 'Administración',
    routes: [
      {
        label: 'Inicio',
        icon: HomeIcon,
        route: '/admin'
      },
      {
        label: 'Sitios',
        icon: OpenFolder,
        route: '/admin/sites'
      }
    ]
  },
  utils: {
    label: 'Herramientas',
    routes: [
      {
        label: 'Palabras clave',
        icon: keywords,
        route: '/admin/keywords'
      },
      {
        label: 'Publicaciones',
        icon: Posts,
        route: '/admin/posts',
        children: [
          {
            label: 'Nueva publicación',
            icon: Posts,
            route: '/admin/posts/new'
          }
        ]
      }
    ]
  }
}
