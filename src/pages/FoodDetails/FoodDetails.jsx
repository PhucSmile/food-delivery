import React from 'react';
import './FoodDetails.scss';
import { useParams } from 'react-router-dom';
import products from '../../assets/fake-data/products';
import SectionFoods from '../../component/UI/sectionFoods/SectionFoods';
import Helmet from '../../component/Helmet/Helmet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState } from 'react';

const FoodDetails = () => {
    const [tab, setTab] = useState('desc'); //lấy value mặc định để active

    // hàm xử lý lấy dữ liệu id: so sánh
    const { id } = useParams(); // lấy đc ib page khác khi ng dùng click vào và truyền id click qua đây
    const product = products.find((item) => item.id === id); //tìm 1 thằng trùng duy nhất từ id của useParams(param này chọc qua lên kia lấy)
    const [previewImg, setPreviewImg] = useState(product.image01); //xong r render ra img lớn - còn img nhỏ khi mà onClick nó SET lại product.image

    return (
        <Helmet title="Food-Details">
            {/* IMG background */}
            <SectionFoods title={product.title} />

            <section>
                <Container>
                    <Row>
                        <Col lg={2} md={2}>
                            <div className="product__imgs">
                                <div className="img__item mb-4" onClick={() => setPreviewImg(product.image01)}>
                                    <img src={product.image01} alt="product-img" className="w-50" />
                                </div>
                                <div className="img__item mb-4" onClick={() => setPreviewImg(product.image02)}>
                                    <img src={product.image02} alt="product-img" className="w-50" />
                                </div>
                                <div className="img__item mb-4" onClick={() => setPreviewImg(product.image03)}>
                                    <img src={product.image03} alt="product-img" className="w-50" />
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={4}>
                            <div className="product__main-img">
                                <img src={previewImg} alt="product-img" className="w-100" />
                            </div>
                        </Col>
                        <Col lg={6} md={6}>
                            <div className="single__product-content">
                                <h2 className="product__title mb-3">{product.title}</h2>
                                <span className="product__price">
                                    Price: <span>${product.price}</span>
                                </span>
                                <p className="product__category mb-5">
                                    Category: <span>{product.category}</span>
                                </p>
                                <button className="addToCart__btn">Add to cart</button>
                            </div>
                        </Col>

                        <Col lg={12} md={12}>
                            <div className="tabs d-flex align-items-center gap-5 py-3">
                                <h6 className={`${tab === 'desc' && 'tabs-active'}`} onClick={() => setTab('desc')}>
                                    Description
                                </h6>
                                <h6 className={`${tab === 'rev' && 'tabs-active'}`} onClick={() => setTab('rev')}>
                                    Review
                                </h6>
                            </div>

                            {tab === 'desc' ? (
                                <div className="tabs__desc">
                                    <p>{product.desc}</p>
                                </div>
                            ) : (
                                <div className="tabs__form mt-4">
                                    <div className="review">
                                        <p className="user__name mb-0">Thành Phúc</p>
                                        <p className="user__email">email: mrphuc48@gmail.com</p>
                                        <p className="feedback__text">great product</p>
                                    </div>

                                    <form className="form__submit">
                                        <div className="form__group">
                                            <input type="text" placeholder="Enter your name" required />
                                        </div>
                                        <div className="form__group">
                                            <input type="text" placeholder="Enter your name" required />
                                        </div>
                                        <div className="form__group">
                                            <textarea type="text" placeholder="Enter your name" rows={5} required />
                                        </div>
                                        <button type="submit" className="addToCart__btn">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default FoodDetails;
