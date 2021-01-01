const fetch = require("node-fetch");
module.exports.UsernameToUUID = function UsernameToUUID(username) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.mojang.com/users/profiles/minecraft/${username.toLowerCase()}`)
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(() => reject(`Username has not been found!`));
    });
}

// HeadAvatar
module.exports.HeadAvatar = function HeadAvatar(uuid) {
    return new Promise((resolve, reject) => {
        fetch(`https://crafatar.com/avatars/${uuid.toLowerCase()}?overlay`)
            .then(res => {
                if (res.status !== 200) reject(`UUID has not been found!`);
                resolve(res.url);
            })
            .catch(() => reject(`UUID has not been found!`));
    });
}

// UUIDToUsername
module.exports.UUIDToUsername = function UUIDToUsername(uuid) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.mojang.com/user/profiles/${uuid.toLowerCase()}/names`)
            .then(res => res.json())
            .then(json => resolve(json.pop()))
            .catch(() => reject(`UUID has not been found!`));
    });
}

// UserHistory
module.exports.UserHistory = function UserHistory(uuid) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.mojang.com/user/profiles/${uuid.toLowerCase()}/names`)
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(() => reject(`UUID has not been found!`));
    });
}

// SkinRendered
module.exports.SkinRendered = function SkinRendered(uuid) {
    return new Promise((resolve, reject) => {
        fetch(`https://crafatar.com/renders/body/${uuid.toLowerCase()}?overlay`)
            .then(res => {
                if (res.status !== 200) reject(`UUID has not been found!`);
                resolve(res.url);
            })
            .catch(() => reject(`UUID has not been found!`));
    });
}

// ServerStats
module.exports.ServerStats = function ServerStats(serverIP) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
                .then(res => res.json())
                .then(json => {
                    if (json.status === 'error') reject(`Server has not been found!`);
                    resolve(json);
                })
                .catch(() => reject(`Server has not been found!`));
        });
    }
    // Cat
module.exports.cat = function cat() {
    return new Promise((resolve, reject) => {
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(res => res.json())
            .then(json => {
                resolve(json);
            })
            .catch(() => reject('There has been an unexpected error!'))

    })


}

// Dog
module.exports.dog = function dog() {
    return new Promise((resolve, reject) => {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(res => res.json())
            .then(json => {
                resolve(json);

            })
            .catch(() => reject('There has been an unexpected error!'));

    })

}

// Covid
module.exports.SearchCountry = (country) => {
    return new Promise((resolve, reject) => {
        fetch("https://api.covid19api.com/summary")
            .then(res => res.json())
            .then(json => {
                var allCountries = json.Countries;
                var filterCountry = allCountries.filter((sc) => sc.Slug === country.toLowerCase());
                if (filterCountry.length < 1) {

                    filterCountry = allCountries.filter((sc) => sc.CountryCode === country.toUpperCase());

                }
                resolve(filterCountry[0]);
            })

    })

}