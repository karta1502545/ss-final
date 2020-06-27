export function toggleNavbar() {
    return {
        type: '@MAIN/TOGGLE_NAVBAR'
    };
}

export function Setuser(name) {
    return {
        type: '@MAIN/USER_NAME',
        name: name
    };
}

