import { Button } from "@/shared/ui";
import { Trash } from "lucide-react";
import styles from "./DeleteUserButton.module.css";

interface DeleteUserButtonProps {
  onDelete: () => void;
}

const DeleteUserButton = ({ onDelete }: DeleteUserButtonProps) => {
  return (
    <Button
      variant="icon"
      size="small"
      onClick={onDelete}
      className={styles.deleteButton}
      aria-label="Delete user"
    >
      <Trash />
    </Button>
  );
};

export default DeleteUserButton;