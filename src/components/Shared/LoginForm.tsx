import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export default function LoginForm() {
	return (
		<div>
			<form>
				<div className="mx-auto max-w-xs space-y-2 my-6">
					{" "}
					<Label htmlFor="email">Ingresa tu Email</Label>{" "}
					<Input
						placeholder="Ingresa tu email"
						id="email"
						name="email"
						type="email"
					/>{" "}
				</div>

				<div className="mx-auto max-w-xs space-y-2 my-6">
					{" "}
					<Label htmlFor="email">Ingresa tu Contraseña</Label>{" "}
					<Input placeholder="Enter password" type="password" />
				</div>

				<div className="mx-auto max-w-xs my-6 flex items-center justify-center gap-x-3">
					<Button type="submit" className="w-full">
						Ingresar
					</Button>
					<Button type="button" className="w-full" variant="light">
						Limpiar
					</Button>
				</div>
			</form>
		</div>
	);
}
