modules.define('image', function(provide) {

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
        function() {
            let imgList = document.querySelectorAll('.image'),
                promiseImgs = [].map.call(imgList, (item) => {
                        return loadImage(getDataPath(item));
                    });
            console.log(promiseImgs);
        }
    );

});

modules.require('image', function(image) {
    image();
});
