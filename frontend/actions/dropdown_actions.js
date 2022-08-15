export const OPEN_DROPDOWN = 'OPEN_DROPDOWN';
export const CLOSE_DROPDOWN = 'CLOSE_DROPDOWN';

export const openDropdown = dropdown => ({
    type: OPEN_DROPDOWN,
    dropdown
});

export const closeDropdown = () => ({
    type: CLOSE_DROPDOWN
});
