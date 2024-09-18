import { useState, useEffect } from 'react';

const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const useHideItems = (storageKey) => {
    const [hiddenItems, setHiddenItems] = useState(getFromLocalStorage(storageKey));

    useEffect(() => {
        saveToLocalStorage(storageKey, hiddenItems);
    }, [hiddenItems, storageKey]);

    const toggleHideItem = (id) => {
        setHiddenItems(prevState => 
            prevState.includes(id)
                ? prevState.filter(itemId => itemId !== id)
                : [...prevState, id]
        );
    };

    return [hiddenItems, toggleHideItem];
};

export const useHideAftesite = () => useHideItems ('hiddenAftesia');
export const useHideEducation = () => useHideItems('hiddenEducation');
export const useHideExperience = () => useHideItems('hiddenExperience');
export const useHideUserGjuhet = () => useHideItems('hiddenUserGjuhet');
export const useHideHonors = () => useHideItems('hiddenHonors');
export const useHideLicensat = () => useHideItems('hiddenLicensat');
export const useHideMbikqyres = () => useHideItems('hiddenMbikqyres');
export const useHideProjekti = () => useHideItems('hiddenProjekti');
export const useHidePublikimi = () => useHideItems('hiddenPublikimi');
export const useHidePuna = () => useHideItems('hiddenPuna');
export const useHideSpecializimi = () => useHideItems('hiddenSpecializimi');

