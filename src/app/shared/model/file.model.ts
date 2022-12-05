export interface IFile{
  id?: string;
  originalName?: string;
  path?: string;
  type?: string;
  size?: number;
}

export class File implements IFile{
  constructor(
    public id?: string,
    public originalName?: string,
    public path?: string,
    public type?: string,
    public size?: number
  ){

  }
}
