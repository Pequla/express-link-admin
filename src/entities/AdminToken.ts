import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Admin } from "./Admin";

@Index("fk_admin_token_idx", ["adminId"], {})
@Index("uq_admin_token_value", ["value"], { unique: true })
@Entity("admin_token", { schema: "data_link" })
export class AdminToken {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "admin_token_id",
    unsigned: true,
  })
  adminTokenId: number;

  @Column("varchar", { name: "value", unique: true, length: 255 })
  value: string;

  @Column("int", { name: "admin_id", unsigned: true })
  adminId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Admin, (admin) => admin.adminTokens, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "admin_id", referencedColumnName: "adminId" }])
  admin: Admin;
}
