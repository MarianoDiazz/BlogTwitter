const tweets = [
    {
        username: 'Rosana',
        perfilImg: 'https://img.freepik.com/foto-gratis/retrato-joven-rubio-mujer_273609-12060.jpg?w=1380&t=st=1699498143~exp=1699498743~hmac=36c70625d14b95b107252f9db676b79c4618a0730926e12c0807a8ee53342f3d',
        content: 'Amo mi profesion, los chicos son los mejores',
        image: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        date: 'Hace dos horas',
    },
    {
        username: 'Pedro',
        perfilImg: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: 'Mi mejor amigo',
        image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        date: 'Hace dos horas',
    },
    {
        username: 'Juliana Diaz',
        perfilImg: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: 'Es todo lo que necesitaba.. ',
        image: 'https://images.pexels.com/photos/1371798/pexels-photo-1371798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        date: 'Hace una semana',
    },
    // Agrega más tweets aquí
];
localStorage.setItem('posts', JSON.stringify(tweets));