export const INSERT = 'INSERT';
export const DELETE = 'DELETE';

export function insertNode(value){
   return {type: INSERT, value};
}

export function deleteNode(value){
   return {type: DELETE, value};
}