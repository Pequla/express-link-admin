import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Admin } from "./Admin";

@Index("fk_token_admin_idx", ["adminId"], {})
@Index("uq_token_value", ["value"], { unique: true })
@Entity("token", { schema: "data_link" })
export class Token {
  @PrimaryGeneratedColumn({ type: "int", name: "token_id", unsigned: true })
  tokenId: number;

  @Column("varchar", { name: "value", unique: true, length: 255 })
  value: string;

  @Column("int", { name: "admin_id", unsigned: true })
  adminId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "used_at", nullable: true })
  usedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Admin, (admin) => admin.tokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "admin_id", referencedColumnName: "adminId" }])
  admin: Admin;
}
