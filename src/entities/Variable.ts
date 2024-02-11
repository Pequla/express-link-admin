import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_variable_name", ["name"], { unique: true })
@Entity("variable", { schema: "data_link" })
export class Variable {
  @PrimaryGeneratedColumn({ type: "int", name: "variable_id", unsigned: true })
  variableId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("varchar", { name: "value", length: 255 })
  value: string;
}
