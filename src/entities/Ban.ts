import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Guild } from "./Guild";

@Index("fk_admin_ban_idx", ["adminId"], {})
@Index("fk_guild_ban_idx", ["guildId"], {})
@Index("fk_user_ban_idx", ["userId"], {})
@Index("uw_ban_user_id", ["userId"], { unique: true })
@Entity("ban", { schema: "data_link" })
export class Ban {
  @PrimaryGeneratedColumn({ type: "int", name: "ban_id", unsigned: true })
  banId: number;

  @Column("int", { name: "user_id", unique: true, unsigned: true })
  userId: number;

  @Column("int", { name: "admin_id", unsigned: true })
  adminId: number;

  @Column("int", { name: "guild_id", unsigned: true })
  guildId: number;

  @Column("varchar", { name: "reason", nullable: true, length: 255 })
  reason: string | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.bans, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "admin_id", referencedColumnName: "userId" }])
  admin: User;

  @ManyToOne(() => Guild, (guild) => guild.bans, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "guild_id", referencedColumnName: "guildId" }])
  guild: Guild;

  @OneToOne(() => User, (user) => user.ban, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
