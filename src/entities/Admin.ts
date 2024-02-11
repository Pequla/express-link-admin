import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { AdminToken } from "./AdminToken";
import { Token } from "./Token";

@Index("fk_user_admin_idx", ["userId"], {})
@Index("uq_admin_username", ["username"], { unique: true })
@Entity("admin", { schema: "data_link" })
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", name: "admin_id", unsigned: true })
  adminId: number;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("boolean", { name: "active", default: () => "'true'" })
  active: boolean;

  @ManyToOne(() => User, (user) => user.admins, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @OneToMany(() => AdminToken, (adminToken) => adminToken.admin)
  adminTokens: AdminToken[];

  @OneToMany(() => Token, (token) => token.admin)
  tokens: Token[];
}
