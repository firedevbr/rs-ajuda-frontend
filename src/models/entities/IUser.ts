import BaseRecord from '@/models/BaseRecord';

interface IUser extends BaseRecord {
  id: number;
  email: string;
  full_name: string;
}

export default IUser;