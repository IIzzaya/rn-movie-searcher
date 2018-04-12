const request = (url, method, body, type) => {
    let isOk;

    const data = type !== undefined ? body : JSON.stringify(body);

    return new Promise((resolve, reject) => {
        fetch(url, {
            credentials: "same-origin",
            method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=utf-8"
            },
            body: data
        })
            .then(response => {
                isOk = response.ok;

                return response.json();
            })
            .then(responseData => {
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
};

export default request;
