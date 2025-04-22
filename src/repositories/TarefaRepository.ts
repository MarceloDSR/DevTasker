import { AppDataSource } from "../data-source";
import { TarefaModel } from "../models/TarefaModel";

export class TarefaRepository {
  private tarefaRepository = AppDataSource.getRepository(TarefaModel);

  async createTarefa(titulo: string, descricao: string, status: string, dataDeEntrega: Date, userId: number) {
    const tarefa = new TarefaModel(titulo, descricao, status, dataDeEntrega);
    return await this.tarefaRepository.save(tarefa);
  }

  async findUserByTitulo(titulo: string) {
    return await this.tarefaRepository.findOne({ where: { titulo } });
  }

  async findTaferaById(id: number) {
    return await this.tarefaRepository.findOne({ where: { id }, relations: ["UsuariosModel", "TarefaModel"] });
  }

  async updateTarefa(id: number, fields: Partial<TarefaModel>) {
    const tarefa = await this.findTaferaById(id);
    if (!tarefa) return null;
    Object.assign(tarefa, fields);
    return await this.tarefaRepository.save(tarefa);
  }

  async deleteTarefa(id: number) {
    const tarefa = await this.findTaferaById(id);
    if (!tarefa) return null;
    return await this.tarefaRepository.remove(tarefa);
  }

  async findAllTarefas() {
    return await this.tarefaRepository.find({ relations: ["UsuariosModel", "TarefaModel"] });
  }
}