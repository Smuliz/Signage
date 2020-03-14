const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

/*HTTP POST metodilla fetchi hsl:n apiin */

const fetchPost = async (url, contentType, data, useProxy = false) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': contentType
        },
        body: data
    };
    let response;
    try {
        response = await fetch(`${useProxy ? proxyUrl : ''}${url}`, options);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('fetchPost error', error.message);
    }
    let responseData = await response.json();
    console.log("response data", responseData)
    return responseData;
};

export {fetchPost};