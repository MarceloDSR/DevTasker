import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import { generateToken } from "../auth";


export class UserController {

  // 👤 Registro de novo usuário
  static async register(req: Request, res: Response) {
    try {
      const { nome, email, senha, dataDeCriacao } = req.body;

      const existing = await repo.findUserByEmail(email);
      if (existing) {
        res.status(400).json({ message: "Email já em uso." });
        return;
      }

      const user = await repo.createUser(nome, email, senha, dataDeCriacao);
      res.status(201).json(user);
      return;
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário", details: error });
      return;
    }
  }

  // 🔐 Login
  static async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const user = await repo.findUserByEmail(email);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      const isValid = await bcrypt.compare(senha, user.senha);
      if (!isValid) {
        res.status(401).json({ message: "Senha inválida." });
        return;
      }

      const token = generateToken({ id: user.id, email: user.email, role: user.role });

      res.json({ message: "Login autorizado", token });
    } catch (error) {
      res.status(500).json({ message: "Erro ao fazer login", details: error });
    }
  }

  // 📜 Buscar todos os usuários
  static async getAll(req: Request, res: Response) {
    try {
      const users = await repo.findAllUsers();
      res.json(users);
      return;
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários", details: error });
      return;
    }
  }

  // 🔍 Buscar usuário por ID
  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await repo.findUserById(id);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário", details: error });
      return;
    }
  }

  // ✏️ Atualizar usuário
  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { nome, email, senha, dataDeCriacao } = req.body;

      const fieldsToUpdate = { nome, email, senha, dataDeCriacao };
      const updated = await repo.updateUser(id, fieldsToUpdate);

      if (!updated) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      res.json({ message: "Usuário atualizado com sucesso.", updated });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar usuário", details: error });
      return;
    }
  }

  // ❌ Deletar usuário
  static async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await repo.deleteUser(id);

      if (!deleted) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      res.json({ message: "Usuário deletado com sucesso." });
      return;
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar usuário", details: error });
      return;
    }
  }

}