// import React, {createContext, useEffect, useRef, useState} from 'react';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import {useClickAway} from 'react-use';
//
// import {getStateWithLoader, StateWithLoader} from '~/utils/StoreUtils';
//
// import styles from './styles/AutoComplete.scss';
//
// interface IAutoCompleteContext {
//     selectedItems: string[];
//     setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
//     isActive: boolean;
//     setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
//     results: StateWithLoader<any[]>;
//     setResults: React.Dispatch<React.SetStateAction<StateWithLoader<any[]>>>;
//     input: string;
//     setInput: React.Dispatch<React.SetStateAction<string>>;
// }
//
// const defaultState: IAutoCompleteContext = {
//     selectedItems: [],
//     setSelectedItems: () => null,
//     selectItem: (item: any) => null,
//     isActive: false,
//     setIsActive: () => null,
//     results: getStateWithLoader([]),
//     setResults: () => null,
//     input: '',
//     setInput: () => null,
// };
//
// export const AutoCompleteContext =
//     createContext<IAutoCompleteContext>(defaultState);
//
// interface AutoCompleteProps {
//     defaultValue?: string;
//     //TODO Fix onSelect with custom EventHandler
//     onSelect?: (item: string | undefined) => void;
//     children: React.ReactNode;
//     multiple?: boolean;
// }
//
// const AutoComplete: React.FC<AutoCompleteProps> = ({
//     children,
//     defaultValue,
//     onSelect,
//     multiple,
// }: AutoCompleteProps) => {
//     const ref = useRef(null);
//
//     useClickAway(ref, () => {
//         setIsActive(false);
//     });
//
//     const [selectedItems, setSelectedItems] = useState(
//         defaultValue ? new Set([defaultValue]) : new Set([])
//     );
//     const selectItem = (selectedItem: any) => {
//         if (multiple) {
//             selectedItems.add(selectedItem);
//             setSelectedItems(selectedItems);
//         } else {
//             selectedItems.clear();
//             selectedItems.add(selectedItem);
//             setSelectedItems(selectedItems);
//         }
//     };
//     const clearSelectedItems = () => {
//         selectedItems.clear();
//         setSelectedItems(selectedItems);
//     };
//     const [isActive, setIsActive] = useState(false);
//     const [input, setInput] = useState(defaultValue || '');
//     const [results, setResults] = useState(getStateWithLoader(undefined));
//
//     useEffect(() => {
//         onSelect?.(selectedItems.);
//     }, [onSelect, selectedItems]);
//
//     //TODO Check styling
//     return (
//         <AutoCompleteContext.Provider
//             value={{
//                 selectedElements,
//                 setSelectedElements,
//                 isActive,
//                 setIsActive,
//                 results,
//                 setResults,
//                 input,
//                 setInput,
//             }}>
//             <div ref={ref} className={styles.wrapper}>
//                 <>{children}</>
//             </div>
//         </AutoCompleteContext.Provider>
//     );
// };
//
// AutoComplete.defaultProps = {
//     defaultValue: '',
//     onSelect: () => null,
//     multiple: false,
// };
//
// export default React.memo(AutoComplete);

export {};
