window.fireBase = (() => {  // protect the lemmings!
        const validate = () => {
            throw new Error('This is a required arg');
        }; // validate

        const uploadFiles = (
            fileSelectSel = validate(),
            fileElemSel = validate(),
            onFileChanged = validate()
        ) => {
            // select anchor tag and file input
            const fileSelect = document.querySelector(fileSelectSel);
            const fileElem = document.querySelector(fileElemSel);

            if (fileSelect === null || fileElem === null) {
                throw new Error('Required DOM elements not found by querySelector');
            }

            // click handler for fileElem
            fileSelect.addEventListener('click', (e) => {
                e.preventDefault();
                fileElem && fileElem.click();
            });

            // change handler for fileSelect
            fileElem.addEventListener('change', (e) => onFileChanged(e.target.files))
        } // uploadFiles


        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyCoSIn0OchCOLD36HA5Nromhp6VF3ALwwk",
            authDomain: "project1-2c3b1.firebaseapp.com",
            databaseURL: "https://project1-2c3b1.firebaseio.com",
            projectId: "project1-2c3b1",
            storageBucket: "project1-2c3b1.appspot.com",
            messagingSenderId: "560045985406"
        };

        // Name of file storage ref "folder"
        const FILE_STORAGE_REF = 'images';

        // initialize firebase
        firebase.initializeApp(config);
        // Get a reference to the storage service, which is used to create references in your storage bucket
        const storageRef = firebase.storage().ref().child(FILE_STORAGE_REF);

        uploadFiles('.js-fileSelect', '.js-fileElem', (files) => {
            if (!storageRef) {
                throw new Error('Storage Ref not set!');
            }
            const fileUploads = Array.from(files).map((currFile) => {
                // we store the name of the file as a storage ref
                const fileRef = storageRef.child(currFile.name);
                // we return a promise where we first "put" or upload the file
                // and then once the upload is complete, we return promise with
                // download URL string of the file we uploaded
                return fileRef.put(currFile).then((snapshot) => snapshot.downloadURL);
            });

            Promise.all(fileUploads).then((items) => {
                console.log(items);
                payload = items[0];

                const userId = localStorage.getItem('user_id');
                if (typeof userId === "undefined" || userId === null) {
                    console.error('userId is not set');
                    return;
                }
                ajax.POST('/api/' + userId + '/post', {
                    activity_payload: payload
                }).then((data) => {
                    console.log(data); 
                });
            });
        }); // upload files
})();
