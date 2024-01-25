interface UpdateUser {
  first_name?: string;
  last_name?: string;
  profile_pic?: File;
}

interface ChatContactItem {
  id?: string;
  room_id?: string | null;
  room_name?: string | null;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_active?: boolean;
  is_group?: boolean;
  last_message?: string;
  message_unseen_count?: number;
}
