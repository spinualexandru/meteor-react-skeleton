function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}
_.mixin({ 'capitalize': capitalize })