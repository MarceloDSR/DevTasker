import { AppDataSource } from "../data-source";
import { UsuariosModel } from "../models/UsuariosModel";


export class usuarioRepository {
    private usuarioRepository = AppDataSource.getRepository(UsuariosModel);

    async createUsuario(name: string, email: string, password: string) {
        const usuario = new UsuariosModel(name, email, password);
        return await this.usuarioRepository.save(usuario);
    }
    async findUserByName(name: string) {
        return await this.usuarioRepository.findOne({ where: { name } });
    }

    async findUserByEmail(email: string) {
        return await this.usuarioRepository.findOne({ where: { email } });
    }

    async findUserByid(id: number) {
        return await this.usuarioRepository.findOne({ where: { id } });
    }

    async updateUsuario(id: number, fields: Partial<UsuariosModel>) {
        const usuario = await this.findUserByid(id);
        if (!usuario) return null;
        Object.assign(usuario, fields);
        return await this.usuarioRepository.save(usuario);
    }

    async deleteUsuario(id: number) {
        const usuario = await this.findUserByid(id);
        if (!usuario) return null;
        return await this.usuarioRepository.remove(usuario);
    }

    async findAllUsuarios() {
        return await this.usuarioRepository.find({ relations: ["UsuariosModel", "TarefaModel"] });
    }

}





