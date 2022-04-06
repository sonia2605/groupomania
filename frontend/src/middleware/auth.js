// vérifier que l'utilisateur dispose d'un token pour la page demandée

export default function auth (to, from, next) {

    if (!localStorage.getItem('token')) {
      next({ name: 'HomeVue' });
      return false
    }
    return next()
}


