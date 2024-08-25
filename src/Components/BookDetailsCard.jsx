import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../Context/MyContext';
import { useFormik } from 'formik';
import * as yup from 'yup'

const BookDetailsCard = ({ book }) => {
    //state for showMoreStatus
    const [showMoreStatus, setShowMoreStatus] = useState(false);
    //state for deleteBook
    const { deleteBook } = useContext(MyContext);
    //state for isEditing
    const [isEditing, setIsEditing] = useState(false);
    //state for bookTitle
    const [bookTitle, setBookTitle] = useState(book.bookTitle);

    //function to show more content
    const readMore = () => {
        setShowMoreStatus(true)
    }

    //function to less content
    const readLess = () => {
        setShowMoreStatus(false)
    }

    //function to handle delete click
    const handleDeleteClick = () => {
        deleteBook(book.id)
    }

    //function to handle edit click
    const handleEditClick = () => {
        setIsEditing(true)
        setShowMoreStatus(true);
    }

    //useFormik
    const formik = useFormik({
        //initial values
        initialValues: {
            bookTitle: book.bookTitle,
            isbnNumber: book.isbnNumber,
            publicationDate: book.publicationDate,
            authorName: book.authorName,
            dateOfBirth: book.dateOfBirth,
            biography: book.biography
        },
        //validation
        validationSchema: yup.object({
            bookTitle: yup.string().required('Required'),
            isbnNumber: yup.string().required('Required'),
            publicationDate: yup.date()
                .required('Required')
                .max(new Date(), 'Date cannot be in future'),
            authorName: yup.string().required('Required'),
            biography: yup.string()
                .required('Required')
                .min(5,'Minumum 5 Characters Required')
                .max(200, 'Max 200 Characters'),
            dateOfBirth: yup.date()
                .required('Required')
                .max(new Date(), 'Date cannot be in future')
        }),
        //onSubmit
        onSubmit: (values) => {
            book.bookTitle = values.bookTitle
            book.isbnNumber = values.isbnNumber
            book.publicationDate = values.publicationDate
            book.authorName = values.authorName
            book.dateOfBirth = values.dateOfBirth
            book.biography = values.biography
            setIsEditing(false)
        }
    })
    return (
        <div className='col-xl-4 col-12 col-md-6 margin-right'>
            <div className="book-details mt-2 mb-2">
                {
                    isEditing
                        ?
                        <>
                            {formik.touched.bookTitle && formik.errors.bookTitle
                                ? (<div className='error-msg'>{formik.errors.bookTitle}</div>)
                                : null
                            }
                            <input className='edit-input' type="text"
                                {...formik.getFieldProps('bookTitle')}
                            />
                            {formik.touched.isbnNumber && formik.errors.isbnNumber
                                ? (<div className='error-msg'>{formik.errors.isbnNumber}</div>)
                                : null
                            }
                            <input className='edit-input' type="text"
                                {...formik.getFieldProps('isbnNumber')}
                            />
                            {formik.touched.publicationDate && formik.errors.publicationDate
                                ? (<span className='error-msg'>{formik.errors.publicationDate}</span>)
                                : null
                            }
                            <input className='edit-input' type="date"
                                {...formik.getFieldProps('publicationDate')}
                            />
                        </>
                        :
                        <>
                            <p><span className="fw-semibold purple fw-bold">Book Name:</span> {book.bookTitle}</p>
                            <p><span className="fw-semibold purple fw-bold" >ISBN Number: </span> {book.isbnNumber}</p>
                            <p> <span className="fw-semibold purple fw-bold">Publication Date: </span> {book.publicationDate}</p>
                        </>
                }
                <div className='d-flex justify-content-between align-items-center'>
                    {
                        !showMoreStatus
                            ? <p onClick={readMore} className='read-more'>Show More</p>
                            : <p onClick={readLess} className='read-more'>Show Less</p>
                    }
                    <div>
                        {
                            isEditing
                                ? <button
                                    type="submit"
                                    onClick={formik.handleSubmit}
                                    className='custom-btn edit-btn'>Save</button>
                                : <button onClick={handleEditClick} className='custom-btn edit-btn'>Edit</button>

                        }
                        <button onClick={handleDeleteClick} className='custom-btn delete-btn'>Delete</button>
                    </div>
                </div>
            </div>

            <div className={showMoreStatus ? "author-details display mt-1" : "author-details"}>
                <p className='fw-bold purple'>Author Details 👇</p>
                {
                    isEditing
                        ?
                        <>
                            {formik.touched.authorName && formik.errors.authorName
                                ? (<div className='error-msg'>{formik.errors.authorName}</div>)
                                : null
                            }
                            <input className='edit-input' type="text"
                                {...formik.getFieldProps('authorName')}
                            />
                            {formik.touched.dateOfBirth && formik.errors.dateOfBirth
                                ? (<span className='error-msg'>{formik.errors.dateOfBirth}</span>)
                                : null
                            }
                            <input className='edit-input' type="date"
                                {...formik.getFieldProps('dateOfBirth')}
                            />
                            {formik.touched.biography && formik.errors.biography
                                ? (<span className='error-msg'>{formik.errors.biography}</span>)
                                : null
                            }
                            <textarea name="" id=""
                                {...formik.getFieldProps('biography')}
                            ></textarea>
                        </>
                        :
                        <>
                            <p><span className="fw-bold">Author Name:</span> {book.authorName}</p>
                            <p><span className="fw-bold" >Date of birth: </span> {book.dateOfBirth}</p>
                            <p> <span className="fw-bold">Biography: </span> {book.biography}</p>
                        </>
                }
            </div>
        </div>
    )
}

export default BookDetailsCard