define(['app'], function(app) {
    app.controller('Dashboard.HomeCtrl', ['$scope', '$location', '$routeParams', 'bzUser',
        function($scope, $location, $routeParams, bzUser) {
            if (!bzUser.is_guest) {
                $location.path('/dashboard');
            }

            $scope.images = [
                {
                    title: 'Учиться - это просто',
                    text: 'Учить новое очень просто. Достаточно выбрать курс и пройти все его задания!',
                    src: '/themes/default/assets/img/carousel/slide1.jpg'
                },
                {
                    title: 'Создавайте свои курсы',
                    text: 'Вы хотите поделиться своими знаниями? Научить людей тому что умеете? Тексты, документы, картинки, видео, веб-сайты, тесты и многое другое можно использовать для создания своего авторского курса.',
                    src: '/themes/default/assets/img/carousel/slide2.jpg'
                },
                {
                    title: 'Отвлекаться? - Да, можно!',
                    text: 'Срочное дело? Поставьте обучение на "паузу". Вы всегда сможете продолжить обучение с того, на чем остановились.',
                    src: '/themes/default/assets/img/carousel/slide3.jpg'
                },
                {
                    title: 'Обучение персонала',
                    text: 'Адаптационное и профессиональное обучение, инструкции и повышение квалификации, интерактивные тренинги и многое другое можно мгновенно предоставить своим сотрудникам и проверить их успеваемость.',
                    src: '/themes/default/assets/img/carousel/slide4.jpg'
                },
                {
                    title: 'Кейс тренера',
                    text: 'Организовывайте свои учебные материалы. Используйте при обучении и назначайте их слушателям. Все максимально просто и удобно.',
                    src: '/themes/default/assets/img/carousel/slide5.jpg'
                }
            ];
        }]);
});