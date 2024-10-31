import { useEffect, useState } from "react";
import { Link } from "wouter";

import { Button } from "../ui/Button";
import { ErrorInputMessage } from "../ui/ErrorInputMessage";
/* Components */
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { RequestMessage } from "../ui/RequestMessage";
import { Switch } from "../ui/Switch";

/* Interfaces */
import type { Product } from "../../core/interfaces/Product.interface";

/* DTO's */
import type { CreateProductDto, UpdateProductDto } from "../../core/dtos/Product.dto";

/* Types */
import type { RequestStatus } from "../../core/types/RequestStatus.type";
import type { StatusMode } from "../../core/types/StatusMode.type";

/* Services */
//import ProductService from "../../core/services/product.service";

interface Props {
	id: Product["id"] | null;
}

export default function ProductsForm({ id }: Props) {
    return(<h1>ProductsForm</h1>)
};
