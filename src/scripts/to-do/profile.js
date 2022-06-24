const profile = (() => {
    const factory = (ID, name) => {
        //TODO: check args
        return {ID, name};
    };

    return {factory};
})();

export default profile;
