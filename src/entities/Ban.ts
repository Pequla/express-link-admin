import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Admin } from "./Admin";
import { User } from "./User";

@Index("fk_ban_admin_idx", ["adminId"], {})
@Index("fk_ban_user_idx", ["userId"], {})
@Entity("ban", { schema: "data_link" })
export class Ban {
  @PrimaryGeneratedColumn({ type: "int", name: "ban_id", unsigned: true })
  banId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("int", { name: "admin_id", unsigned: true })
  adminId: number;

  @Column("varchar", { name: "reason", nullable: true, length: 255 })
  reason: string | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Admin, (admin) => admin.bans, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "admin_id", referencedColumnName: "adminId" }])
  admin: Admin;

  @ManyToOne(() => User, (user) => user.bans, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
