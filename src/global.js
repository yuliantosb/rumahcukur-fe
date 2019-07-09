let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = 'http://localhost:8000/api';
} else {    
    url = 'https://shard-backend.herokuapp.com/api';
}

const appName = 'Rumah Cukur';
const customerStyles = { 
    control: (styles, {isFocused}) => ({ 
        ...styles, 
        backgroundColor: 'transparent',
        boxShadow: isFocused ? '0 0.313rem 0.719rem rgba(0,123,255,.1), 0 0.156rem 0.125rem rgba(0,0,0,.06)' : 'none'
    }),
};

export { url, appName, customerStyles }