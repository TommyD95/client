import { Box, Typography, Pagination } from "@mui/material";
import ProductViewModel from "../../../models/ProductViewModel.model";
import { useEffect } from "react";
import MetaData from "../../../models/pagination.model";

interface IProps {
    pagination: MetaData;
    onPageChange: (page: number) => void;
}

const AppPagination = (props: IProps) => {

    const { pagination, onPageChange } = props;

    useEffect(() => {
        console.log(pagination.currentPage ? pagination.currentPage : 0)
    }, [pagination])

    const { currentPage, pageSize, totalCount, totalPages } = pagination;

    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <Typography>
                Displaying {(currentPage - 1) * pageSize + 1}-{currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize} of {totalCount} items
            </Typography>
            {pagination ? (
                <Pagination
                    color="secondary"
                    size="large"
                    count={totalPages}
                    onChange={(e, currentPage) => onPageChange(currentPage)}
                />
            ) : null}
        </Box>
    )
}

export default AppPagination;