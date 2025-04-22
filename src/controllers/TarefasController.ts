import { Request, Response } from "express";
import { TarefaRepository } from "../repositories/TarefaRepository";

const repo = new TarefaRepository();

export class TarefasController {

  // 🆕 Criar nova tarefa
  static async create(req: Request, res: Response) {
    try {
      const { titulo, descricao, status, dataDeEntrega, usuarioId } = req.body;

      const tarefa = await repo.createTarefa(
        titulo,
        descricao,
        status,
        dataDeEntrega,
        usuarioId
      );

      res.status(201).json(tarefa);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar tarefa", details: error });
    }
  }

  // 📋 Listar todas as tarefas
  static async getAll(req: Request, res: Response) {
    try {
      const tarefas = await repo.findAllTarefas();
      res.json(tarefas);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tarefas", details: error });
    }
  }

  // 🔍 Buscar tarefa por ID
  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const tarefa = await repo.findTaferaById(id);

      if (!tarefa) {
        res.status(404).json({ message: "Tarefa não encontrada." });
        return;
      }

      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tarefa", details: error });
    }
  }

  // ✏️ Atualizar tarefa
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { titulo, descricao, status, dataDeEntrega, usuarioId } = req.body;

      const fields = { titulo, descricao, status, dataDeEntrega, usuarioId }

      const tarefaAtualizada = await repo.updateTarefa(id, fields);

      if (!tarefaAtualizada) {
        res.status(404).json({ message: "Tarefa não encontrada." });
        return;
      }

      res.json({ message: "Tarefa atualizada com sucesso.", tarefaAtualizada });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar tarefa", details: error });
    }
  }

  // ❌ Deletar tarefa
  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deletada = await repo.deleteTarefa(id);

      if (!deletada) {
        res.status(404).json({ message: "Tarefa não encontrada." });
        return;
      }

      res.json({ message: "Tarefa deletada com sucesso." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar tarefa", details: error });
    }
  }

}
