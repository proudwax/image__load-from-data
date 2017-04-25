modules.define('image', function(provide) {

    let _moduleName = this.name;

    function getDataPath (imageNode) {

        let data = imageNode.dataset.block;

        if (data) {
            return JSON.parse(data).image.src;
        } else {
            return null;
        }
    }

    function loadImage (path) {
        if (path) {
            return new Promise ((resolve, reject) => {
                let img = new Image();

                img.onload = (() => { return resolve(path); });
                img.onerror = (() => { return reject(path); });

                img.src = path;
            });
        }
    }

    provide(
        function(addQuerySelector) {
            let imgList = document.querySelectorAll('.' + _moduleName + addQuerySelector);

            [].map.call(imgList, (item, i) => {
                promiseImg = loadImage(getDataPath(item));

                promiseImg.then(
                    function (res) {
                        item.src = res;
                    }
                ).catch(
                    function (err) {
                        console.error(err);
                    }
                );
            });

        }
    );

});

modules.require('image', function(image) {
    image('[data-block]');
});
